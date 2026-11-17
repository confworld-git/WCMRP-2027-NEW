
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: 100
    },

    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      maxlength: 150
    },

    phone: {
      type: String,
      trim: true,
      default: ""
    },

    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true
    },

    serviceRequired: {
      type: String,
      enum: [
        "Paper Submission",
        "Academic Partnership",
        "Sponsorship & Exhibition",
        "Conference Registration",
        "Speaker Nomination",
        "General Query"
      ],
      default: "General Query"
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 2000
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Closed"],
      default: "Pending"
    },

    archivedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
