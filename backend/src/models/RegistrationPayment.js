import mongoose from "mongoose";

const paymentAttemptSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true },
    status: { type: String, required: true, enum: ["Failed"] },
    errorCode: { type: String, maxlength: 150 },
    errorDescription: { type: String, maxlength: 500 },
    attemptedAt: { type: Date, required: true },
  },
  { _id: false },
);

const registrationPaymentSchema = new mongoose.Schema(
  {
    registration: {
      title: { type: String, required: true },
      firstName: { type: String, required: true, trim: true, maxlength: 100 },
      lastName: { type: String, required: true, trim: true, maxlength: 100 },
      certificateName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },
      dateOfBirth: { type: String, required: true },
      nationality: { type: String, required: true, maxlength: 100 },
      department: { type: String, required: true, maxlength: 150 },
      institution: { type: String, required: true, maxlength: 200 },
      mobile: { type: String, required: true, maxlength: 30 },
      email: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 150,
      },
      participantCategory: { type: String, required: true },
      presentationCategory: { type: String, required: true },
      presentationType: { type: String, required: true },
    },
    selection: {
      presentationType: { type: String, required: true },
      feeCategory: { type: String, required: true },
      feePeriod: { type: String, required: true },
      journalId: { type: String, default: null },
      addonIds: { type: [String], default: [] },
      membership: { type: Boolean, required: true },
    },
    orderId: { type: String, required: true, unique: true },
    paymentId: { type: String, unique: true, sparse: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, required: true, enum: ["USD"] },
    status: {
      type: String,
      required: true,
      enum: [
        "created",
        "pending",
        "success",
        "failed",
        "cancelled",
        "Pending",
        "Paid",
      ],
      default: "created",
    },
    paymentAttempts: { type: [paymentAttemptSchema], default: [] },
    paidAt: { type: Date },
  },
  { timestamps: true },
);

const RegistrationPayment = mongoose.model(
  "RegistrationPayment",
  registrationPaymentSchema,
);

export default RegistrationPayment;
