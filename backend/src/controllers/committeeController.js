import CommitteeApplication from "../models/CommitteeApplication.js";
import { getUploadedFileData } from "../utils/uploadedFile.js";
import { sendCommitteeApplicationEmails } from "../utils/email.js";

export const createCommitteeApplication = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload your CV.",
    });
  }

  const application = new CommitteeApplication({
    title: req.body.title,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    country: req.body.country,
    memberCategory: req.body.memberCategory,
    organization: req.body.organization,
    department: req.body.department,
    qualification: req.body.qualification,
    professionalExperience: req.body.professionalExperience,
    industryExperience: req.body.industryExperience,
    specialization: req.body.specialization,
    ceradaAssociated: req.body.ceradaAssociated,
    hIndex: req.body.hIndex,
    scopusPublications: req.body.scopusPublications,
    sciPublications: req.body.sciPublications,
    editorReviewer: req.body.editorReviewer,
    foundEventVia: req.body.foundEventVia,
    cvFile: getUploadedFileData(req.file),
  });

  try {
    await application.save();
    try {
      await sendCommitteeApplicationEmails(application);
    } catch (error) {
      console.error("Committee application email delivery failed:", error);
      return res.status(502).json({
        success: false,
        saved: true,
        message:
          "Your application was saved, but we could not send the email notifications. Please try again later.",
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Your committee application was submitted and email notifications were sent.",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please check the application details and try again.",
      });
    }

    console.error("Committee application submission failed:", error);
    return res.status(500).json({
      success: false,
      message: "We could not submit your application. Please try again.",
    });
  }
};
