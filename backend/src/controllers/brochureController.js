import BrochureRequest from "../models/BrochureRequest.js";
import { sendBrochureAdminEmail } from "../utils/email.js";

const requiredFields = [
  "fullName",
  "email",
  "socialMediaLink",
  "phone",
  "discoverySource",
];

const fieldLimits = {
  fullName: 100,
  email: 150,
  socialMediaLink: 2048,
  phone: 16,
  discoverySource: 500,
};

export const createBrochureRequest = async (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid form details.",
    });
  }

  const brochureData = {};

  for (const field of requiredFields) {
    const value = req.body[field];

    if (typeof value !== "string" || !value.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    brochureData[field] = value.trim();

    if (brochureData[field].length > fieldLimits[field]) {
      return res.status(400).json({
        success: false,
        message: `The ${field} field is too long.`,
      });
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brochureData.email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address.",
    });
  }

  if (!/^\+[1-9]\d{1,14}$/.test(brochureData.phone)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid phone number with country code.",
    });
  }

  try {
    const socialMediaUrl = new URL(brochureData.socialMediaLink);
    if (!["http:", "https:"].includes(socialMediaUrl.protocol)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid social media link.",
      });
    }
  } catch {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid social media link.",
    });
  }

  try {
    const brochureRequest = await BrochureRequest.create(brochureData);

    try {
      await sendBrochureAdminEmail(brochureRequest);
    } catch (error) {
      console.error("Brochure request email delivery failed:", error);
      return res.status(502).json({
        success: false,
        saved: true,
        message:
          "Your brochure request was saved, but we could not send the admin notification. Please try again later.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Your brochure request was submitted successfully.",
    });
  } catch (error) {
    console.error("Brochure request submission failed:", error);
    return res.status(500).json({
      success: false,
      message: "We could not submit your request. Please try again.",
    });
  }
};
