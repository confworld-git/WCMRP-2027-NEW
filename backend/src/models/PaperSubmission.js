import mongoose from "mongoose";

const uploadedFileSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true, maxlength: 255 },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true, min: 1, max: 3 * 1024 * 1024 },
    data: { type: Buffer, required: true },
  },
  { _id: false },
);

const optionalHttpUrl = {
  type: String,
  trim: true,
  maxlength: 2048,
  validate: {
    validator: (value) => !value || /^https?:\/\/\S+$/i.test(value),
    message: "Please provide a valid HTTP or HTTPS URL.",
  },
};

const paperSubmissionSchema = new mongoose.Schema(
  {
    paperId: {
      type: String,
      required: true,
      trim: true,
      match: /^WCMRP2027_MY_\d{3}$/,
    },
    paperTitle: { type: String, required: true, trim: true, maxlength: 300 },
    authorName: { type: String, required: true, trim: true, maxlength: 150 },
    coauthors: { type: String, trim: true, maxlength: 500, default: "" },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^\+[1-9]\d{1,14}$/,
    },
    country: { type: String, required: true, trim: true, maxlength: 100 },
    whatsapp: { type: String, trim: true, maxlength: 30, default: "" },
    linkedin: optionalHttpUrl,
    facebook: optionalHttpUrl,
    institution: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    department: { type: String, trim: true, maxlength: 150, default: "" },
    designation: { type: String, trim: true, maxlength: 150, default: "" },
    submissionType: {
      type: String,
      required: true,
      enum: ["Abstract", "Full paper"],
    },
    presentationCategory: {
      type: String,
      required: true,
      enum: ["Oral", "Poster"],
    },
    presentationType: {
      type: String,
      required: true,
      enum: ["Virtual", "Physical"],
    },
    publicationRequired: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    paperFile: { type: uploadedFileSchema, required: true },
    conferenceSource: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    message: { type: String, trim: true, maxlength: 2000, default: "" },
    status: {
      type: String,
      enum: ["Submitted", "In Review", "Accepted", "Rejected"],
      default: "Submitted",
    },
    archivedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const PaperSubmission = mongoose.model(
  "PaperSubmission",
  paperSubmissionSchema,
);

export default PaperSubmission;
