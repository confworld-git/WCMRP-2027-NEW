import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    seedKey: {
      type: String,
      required: true,
      unique: true,
      default: "primary-admin",
      select: false,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 254,
    },
    passwordHash: { type: String, required: true, select: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
