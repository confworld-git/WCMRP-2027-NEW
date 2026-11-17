import express from "express";
import {
  cancelRegistrationPayment,
  createRegistrationOrder,
  markRegistrationPaymentPending,
  recordFailedRegistrationPayment,
  verifyRegistrationPayment,
} from "../controllers/registrationPaymentController.js";

const router = express.Router();

router.post("/orders", createRegistrationOrder);
router.post("/orders/:orderId/start", markRegistrationPaymentPending);
router.post("/orders/:orderId/cancel", cancelRegistrationPayment);
router.post("/verify", verifyRegistrationPayment);
router.post("/attempts/failed", recordFailedRegistrationPayment);

export default router;
