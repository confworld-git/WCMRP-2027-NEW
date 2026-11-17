import mongoose from "mongoose";

const brochureRequestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    socialMediaLink: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2048,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^\+[1-9]\d{1,14}$/,
    },
    discoverySource: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true },
);

const BrochureRequest = mongoose.model(
  "BrochureRequest",
  brochureRequestSchema,
);

export default BrochureRequest;
