import Admin from "../models/Admin.js";
import Contact from "../models/Contact.js";
import CommitteeApplication from "../models/CommitteeApplication.js";
import PaperSubmission from "../models/PaperSubmission.js";
import RegistrationPayment from "../models/RegistrationPayment.js";
import {
  ADMIN_SESSION_COOKIE_NAME,
  getAdminCookieOptions,
} from "../config/adminSecurity.js";
import { verifyAdminPassword } from "../utils/adminPassword.js";

const SESSION_MAX_AGE = 8 * 60 * 60 * 1000;
const REMEMBERED_SESSION_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const DUMMY_PASSWORD_HASH = `scrypt$${Buffer.alloc(16).toString("base64")}$${Buffer.alloc(64).toString("base64")}`;

export const loginAdmin = async (req, res) => {
  const { email, password, remember } = req.body || {};
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    email.length > 254 ||
    password.length > 256
  ) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email address and password.",
    });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const admin = await Admin.findOne({ email: normalizedEmail }).select(
    "+passwordHash",
  );
  const passwordMatches = await verifyAdminPassword(
    password,
    admin?.passwordHash || DUMMY_PASSWORD_HASH,
  );

  if (!admin || !admin.isActive || !passwordMatches) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password.",
    });
  }

  await new Promise((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
  req.session.adminId = admin._id.toString();
  req.session.cookie.maxAge =
    remember === true ? REMEMBERED_SESSION_MAX_AGE : SESSION_MAX_AGE;

  await new Promise((resolve, reject) => {
    req.session.save((error) => {
      if (error) reject(error);
      else resolve();
    });
  });

  return res.status(200).json({
    success: true,
    admin: { email: admin.email },
  });
};

export const getCurrentAdmin = (req, res) =>
  res.status(200).json({
    success: true,
    admin: { email: req.admin.email },
  });

export const logoutAdmin = async (req, res, next) => {
  const clearSessionCookie = () => {
    res.clearCookie(ADMIN_SESSION_COOKIE_NAME, getAdminCookieOptions());
    return res.status(200).json({ success: true });
  };

  if (!req.session) {
    return clearSessionCookie();
  }

  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    return clearSessionCookie();
  });
};

export const getAdminDashboard = async (_req, res) => {
  const [
    paperSubmissions,
    contactRequests,
    committeeApplications,
    registrationPayments,
  ] = await Promise.all([
    PaperSubmission.countDocuments({ archivedAt: null }),
    Contact.countDocuments({ archivedAt: null }),
    CommitteeApplication.countDocuments({ archivedAt: null }),
    RegistrationPayment.countDocuments(),
  ]);

  return res.status(200).json({
    success: true,
    summary: {
      paperSubmissions,
      contactRequests,
      committeeApplications,
      registrationPayments,
    },
  });
};

