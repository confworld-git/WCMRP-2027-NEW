import Admin from "../models/Admin.js";
import { getFrontendOrigins } from "../config/adminSecurity.js";

export const requireAdminOrigin = (req, res, next) => {
  const origin = req.get("origin");
  if (!origin || !getFrontendOrigins().includes(origin)) {
    return res.status(403).json({
      success: false,
      message: "Request origin is not allowed.",
    });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  const adminId = req.session?.adminId;
  if (!adminId) {
    return res.status(401).json({
      success: false,
      message: "Admin authentication is required.",
    });
  }

  try {
    const admin = await Admin.findOne({ _id: adminId, isActive: true })
      .select("_id email")
      .lean();
    if (!admin) {
      req.session.destroy((error) => {
        if (error) {
          console.error("Could not clear an invalid admin session:", error);
        }
      });
      return res.status(401).json({
        success: false,
        message: "Admin authentication is required.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};
