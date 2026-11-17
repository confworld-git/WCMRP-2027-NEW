import Contact from "../models/Contact.js";
import { sendContactAdminEmail } from "../utils/email.js";

// 1. CREATE CONTACT ENQUIRY
export const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, country, serviceRequired, message } =
      req.body;

    if (!fullName || !email || !country || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const contact = await Contact.create({
      fullName,
      email,
      phone,
      country,
      serviceRequired,
      message,
    });

    try {
      await sendContactAdminEmail(contact);
    } catch (error) {
      console.error("Contact enquiry email delivery failed:", error);
      return res.status(502).json({
        success: false,
        saved: true,
        message:
          "Your enquiry was saved, but we could not send the email notifications. Please try again later.",
      });
    }

    res.status(201).json({
      success: true,
      message: "Contact enquiry submitted and email notifications sent.",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit contact enquiry",
      error: error.message,
    });
  }
};

