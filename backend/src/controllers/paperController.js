import PaperSubmission from "../models/PaperSubmission.js";
import { getUploadedFileData } from "../utils/uploadedFile.js";
import { sendPaperSubmissionEmails } from "../utils/email.js";

export const createPaperSubmission = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please upload your paper document.",
    });
  }

  const submission = new PaperSubmission({
    paperId: req.body.paperId,
    paperTitle: req.body.paperTitle,
    authorName: req.body.authorName,
    coauthors: req.body.coauthors,
    email: req.body.email,
    mobile: req.body.mobile,
    country: req.body.country,
    whatsapp: req.body.whatsapp,
    linkedin: req.body.linkedin,
    facebook: req.body.facebook,
    institution: req.body.institution,
    department: req.body.department,
    designation: req.body.designation,
    submissionType: req.body.submissionType,
    presentationCategory: req.body.presentationCategory,
    presentationType: req.body.presentationType,
    publicationRequired: req.body.publicationRequired,
    paperFile: getUploadedFileData(req.file),
    conferenceSource: req.body.conferenceSource,
    message: req.body.message,
  });

  try {
    await submission.save();
    try {
      await sendPaperSubmissionEmails(submission);
    } catch {
      return res.status(502).json({
        success: false,
        saved: true,
        message:
          "Your paper submission was saved, but one or more notification emails could not be sent. Please try again later.",
      });
    }

    return res.status(201).json({
      success: true,
      message: `Your paper submission was received successfully. Paper ID: ${submission.paperId}.`,
      paperId: submission.paperId,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Please check the submission details and try again.",
      });
    }

    console.error("Paper submission failed:", error);
    return res.status(500).json({
      success: false,
      message: "We could not submit your paper. Please try again.",
    });
  }
};
