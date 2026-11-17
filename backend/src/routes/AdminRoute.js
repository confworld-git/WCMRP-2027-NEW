import express from "express";
import { rateLimit } from "express-rate-limit";
import {
  getAdminDashboard,
  getCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminController.js";
import {
  deleteAdminRegistration,
  downloadAdminRecordFile,
  listAdminRecords,
  setAdminRecordArchived,
  updateAdminRecord,
} from "../controllers/adminRecordsController.js";
import {
  requireAdmin,
  requireAdminOrigin,
} from "../middleware/adminAccess.js";

const router = express.Router();

router.use((_req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: "Too many sign-in attempts. Please try again later.",
  },
});

router.post("/auth/login", loginLimiter, requireAdminOrigin, loginAdmin);
router.get("/auth/me", requireAdmin, getCurrentAdmin);
router.post("/auth/logout", requireAdminOrigin, requireAdmin, logoutAdmin);
router.get("/dashboard", requireAdmin, getAdminDashboard);
router.get("/records/:type", requireAdmin, listAdminRecords);
router.get(
  "/records/:type/:id/file",
  requireAdmin,
  downloadAdminRecordFile,
);
router.patch(
  "/records/:type/:id/archive",
  requireAdminOrigin,
  requireAdmin,
  setAdminRecordArchived,
);
router.patch(
  "/records/:type/:id",
  requireAdminOrigin,
  requireAdmin,
  updateAdminRecord,
);
router.delete(
  "/records/:type/:id",
  requireAdminOrigin,
  requireAdmin,
  deleteAdminRegistration,
);

export default router;
