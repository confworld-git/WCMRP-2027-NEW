import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import { hashAdminPassword } from "../utils/adminPassword.js";

dotenv.config();

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!process.env.MONGO_URI || !email || !password) {
    throw new Error(
      "Set MONGO_URI, ADMIN_EMAIL, and ADMIN_PASSWORD in backend/.env before seeding.",
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new Error("ADMIN_EMAIL must be a valid email address.");
  }
  if (password.length < 12 || password.length > 256) {
    throw new Error("ADMIN_PASSWORD must be between 12 and 256 characters.");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    const passwordHash = await hashAdminPassword(password);
    await Admin.findOneAndUpdate(
      { seedKey: "primary-admin" },
      {
        $set: {
          seedKey: "primary-admin",
          email,
          passwordHash,
          isActive: true,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
    await mongoose.connection
      .collection("admin_sessions")
      .deleteMany({});
    console.log("Admin account seeded. You can now sign in.");
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin().catch((error) => {
  console.error("Admin seed failed:", error.message);
  process.exitCode = 1;
});
