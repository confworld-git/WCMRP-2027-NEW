import mongoose from "mongoose";

const uploadedFileSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true, maxlength: 255 },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true, min: 1 },
    data: { type: Buffer, required: true },
  },
  { _id: false },
);

const committeeApplicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Ms", "Dr", "Prof"],
    },
    fullName: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^\+[1-9]\d{1,14}$/,
    },
    country: { type: String, required: true, trim: true, maxlength: 100 },
    memberCategory: {
      type: String,
      required: true,
      enum: ["Advisory", "Scientific", "Hospitality"],
    },
    organization: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    department: { type: String, required: true, trim: true, maxlength: 150 },
    qualification: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    professionalExperience: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    industryExperience: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    ceradaAssociated: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    hIndex: { type: Number, required: true, min: 0, validate: Number.isInteger },
    scopusPublications: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isInteger,
    },
    sciPublications: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isInteger,
    },
    editorReviewer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    foundEventVia: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    cvFile: { type: uploadedFileSchema, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Review", "Accepted", "Rejected"],
      default: "Pending",
    },
    archivedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const CommitteeApplication = mongoose.model(
  "CommitteeApplication",
  committeeApplicationSchema,
);

export default CommitteeApplication;
