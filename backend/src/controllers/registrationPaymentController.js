import crypto from "node:crypto";
import RegistrationPayment from "../models/RegistrationPayment.js";
import {
  calculateRegistrationAmount,
  getRazorpayClient,
  validateRegistrationDetails,
  verifyRazorpaySignature,
  verifyRazorpayWebhookSignature,
} from "../utils/registrationPayment.js";

const SUCCESS_STATUSES = ["success", "Paid"];
const CHECKOUT_STATUSES = [
  "created",
  "pending",
  "failed",
  "cancelled",
  "Pending",
];

const persistFailedPaymentAttempt = async (registrationPayment, payment) => {
  await RegistrationPayment.updateOne(
    {
      orderId: registrationPayment.orderId,
      status: { $nin: SUCCESS_STATUSES },
    },
    {
      $set: { status: "failed" },
    },
  );
  await RegistrationPayment.updateOne(
    {
      orderId: registrationPayment.orderId,
      "paymentAttempts.paymentId": { $ne: payment.id },
    },
    {
      $push: {
        paymentAttempts: {
          paymentId: payment.id,
          status: "Failed",
          errorCode: payment.error_code,
          errorDescription: payment.error_description,
          attemptedAt: new Date(),
        },
      },
    },
  );
};

const markRegistrationAsPaid = async (registrationPayment, payment) => {
  const { orderId } = registrationPayment;
  const paidRegistration = await RegistrationPayment.findOneAndUpdate(
    { orderId, status: { $in: CHECKOUT_STATUSES } },
    {
      $set: {
        paymentId: payment.id,
        status: "success",
        paidAt: new Date(),
      },
    },
    { returnDocument: "after", runValidators: true },
  );

  if (paidRegistration) {
    return true;
  }

  const currentRegistration = await RegistrationPayment.findOne({ orderId });
  return (
    SUCCESS_STATUSES.includes(currentRegistration?.status) &&
    currentRegistration.paymentId === payment.id
  );
};

export const markRegistrationPaymentPending = async (req, res) => {
  const { orderId } = req.params;
  if (typeof orderId !== "string" || !orderId) {
    return res.status(400).json({
      success: false,
      message: "Registration payment order is required.",
    });
  }

  try {
    const registrationPayment = await RegistrationPayment.findOneAndUpdate(
      { orderId, status: { $in: CHECKOUT_STATUSES } },
      { $set: { status: "pending" } },
      { returnDocument: "after", runValidators: true },
    );
    if (registrationPayment) {
      return res.status(200).json({ success: true, status: "pending" });
    }

    const existingRegistration = await RegistrationPayment.findOne({ orderId });
    if (!existingRegistration) {
      return res.status(404).json({
        success: false,
        message: "The registration payment order was not found.",
      });
    }
    return res.status(409).json({
      success: false,
      message: "This registration payment has already been processed.",
    });
  } catch (error) {
    console.error("Could not update registration payment status:", error);
    return res.status(502).json({
      success: false,
      message: "We could not update the registration payment status.",
    });
  }
};

export const cancelRegistrationPayment = async (req, res) => {
  const { orderId } = req.params;
  if (typeof orderId !== "string" || !orderId) {
    return res.status(400).json({
      success: false,
      message: "Registration payment order is required.",
    });
  }

  try {
    const registrationPayment = await RegistrationPayment.findOneAndUpdate(
      {
        orderId,
        status: { $in: ["created", "pending", "cancelled", "Pending"] },
      },
      { $set: { status: "cancelled" } },
      { returnDocument: "after", runValidators: true },
    );
    if (registrationPayment) {
      return res.status(200).json({ success: true, status: "cancelled" });
    }

    const existingRegistration = await RegistrationPayment.findOne({ orderId });
    if (!existingRegistration) {
      return res.status(404).json({
        success: false,
        message: "The registration payment order was not found.",
      });
    }
    return res.status(409).json({
      success: false,
      message: "This registration payment cannot be cancelled.",
    });
  } catch (error) {
    console.error("Could not cancel registration payment:", error);
    return res.status(502).json({
      success: false,
      message: "We could not update the registration payment status.",
    });
  }
};

export const createRegistrationOrder = async (req, res) => {
  let registration;
  let pricing;
  try {
    registration = validateRegistrationDetails(req.body?.registration);
    pricing = calculateRegistrationAmount(req.body?.selection);
    if (registration.presentationType !== pricing.selection.presentationType) {
      throw new Error("Presentation type must match the selected fee.");
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

  try {
    const { client, keyId } = getRazorpayClient();
    const order = await client.orders.create({
      amount: pricing.amount,
      currency: pricing.currency,
      receipt: crypto.randomBytes(12).toString("hex"),
    });

    await RegistrationPayment.create({
      registration,
      selection: pricing.selection,
      orderId: order.id,
      amount: pricing.amount,
      currency: pricing.currency,
      status: "created",
      status: "created",
    });

    return res.status(201).json({
      success: true,
      keyId,
      orderId: order.id,
      amount: pricing.amount,
      currency: pricing.currency,
    });
  } catch (error) {
    console.error("Registration payment order creation failed:", error);
    return res.status(502).json({
      success: false,
      message: "We could not start checkout. Please try again.",
    });
  }
};

export const verifyRegistrationPayment = async (req, res) => {
  const {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signature,
  } = req.body || {};
  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    typeof signature !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment verification details are incomplete.",
    });
  }

  try {
    const registrationPayment = await RegistrationPayment.findOne({ orderId });
    if (!registrationPayment) {
      return res.status(404).json({
        success: false,
        message: "The registration payment order was not found.",
      });
    }

    const { client, keySecret } = getRazorpayClient();
    if (!verifyRazorpaySignature(orderId, paymentId, signature, keySecret)) {
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed.",
      });
    }

    if (
      SUCCESS_STATUSES.includes(registrationPayment.status) &&
      registrationPayment.paymentId === paymentId
    ) {
      return res.status(200).json({
        success: true,
        message: "Registration payment has been verified.",
        status: "success",
      });
    }

    if (!CHECKOUT_STATUSES.includes(registrationPayment.status)) {
      return res.status(409).json({
        success: false,
        message: "This registration payment has already been processed.",
      });
    }

    const payment = await client.payments.fetch(paymentId);
    if (
      payment.order_id !== orderId ||
      payment.amount !== registrationPayment.amount ||
      payment.currency !== registrationPayment.currency ||
      payment.status !== "captured"
    ) {
      return res.status(400).json({
        success: false,
        message: "The payment is not captured for the expected amount.",
      });
    }

    const markedAsPaid = await markRegistrationAsPaid(registrationPayment, {
      id: paymentId,
    });
    if (!markedAsPaid) {
      return res.status(409).json({
        success: false,
        message: "This registration payment has already been processed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Registration payment has been verified.",
      status: "success",
    });
  } catch (error) {
    console.error("Registration payment verification failed:", error);
    return res.status(502).json({
      success: false,
      message: "We could not verify the payment. Please contact support.",
    });
  }
};

export const recordFailedRegistrationPayment = async (req, res) => {
  const { orderId, paymentId } = req.body || {};
  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    !orderId ||
    !paymentId
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment attempt details are incomplete.",
    });
  }

  try {
    const registrationPayment = await RegistrationPayment.findOne({ orderId });
    if (!registrationPayment) {
      return res.status(404).json({
        success: false,
        message: "The registration payment order was not found.",
      });
    }

    const { client } = getRazorpayClient();
    const payment = await client.payments.fetch(paymentId);
    if (
      payment.id !== paymentId ||
      payment.order_id !== orderId ||
      payment.amount !== registrationPayment.amount ||
      payment.currency !== registrationPayment.currency ||
      payment.status !== "failed"
    ) {
      return res.status(400).json({
        success: false,
        message: "The failed payment attempt could not be verified.",
      });
    }

    await persistFailedPaymentAttempt(registrationPayment, payment);
    return res.status(200).json({
      success: true,
      message: "Failed payment attempt recorded.",
    });
  } catch (error) {
    console.error("Failed payment attempt could not be recorded:", error);
    return res.status(502).json({
      success: false,
      message: "We could not verify the failed payment attempt.",
    });
  }
};

export const handleRegistrationPaymentWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.get("x-razorpay-signature");
  if (!secret) {
    return res.status(503).json({
      success: false,
      message: "Razorpay webhooks are not configured.",
    });
  }
  if (!verifyRazorpayWebhookSignature(req.body, signature, secret)) {
    return res.status(400).json({
      success: false,
      message: "Webhook signature verification failed.",
    });
  }

  let event;
  try {
    event = JSON.parse(req.body.toString("utf8"));
  } catch {
    return res.status(400).json({
      success: false,
      message: "Webhook payload is invalid.",
    });
  }

  try {
    if (event.event === "payment.failed") {
      const payment = event.payload?.payment?.entity;
      if (!payment?.id || !payment.order_id) {
        return res.status(400).json({
          success: false,
          message: "Webhook payment details are incomplete.",
        });
      }

      const registrationPayment = await RegistrationPayment.findOne({
        orderId: payment.order_id,
      });
      if (
        registrationPayment &&
        payment.status === "failed" &&
        payment.amount === registrationPayment.amount &&
        payment.currency === registrationPayment.currency
      ) {
        await persistFailedPaymentAttempt(registrationPayment, payment);
      }
      return res.sendStatus(200);
    }

    if (event.event === "order.paid") {
      const order = event.payload?.order?.entity;
      const payment = event.payload?.payment?.entity;
      if (!order?.id || !payment?.id) {
        return res.status(400).json({
          success: false,
          message: "Webhook payment details are incomplete.",
        });
      }

      const registrationPayment = await RegistrationPayment.findOne({
        orderId: order.id,
      });
      if (
        registrationPayment &&
        order.status === "paid" &&
        order.amount === registrationPayment.amount &&
        order.currency === registrationPayment.currency &&
        payment.order_id === order.id &&
        payment.status === "captured" &&
        payment.amount === registrationPayment.amount &&
        payment.currency === registrationPayment.currency
      ) {
        const markedAsPaid = await markRegistrationAsPaid(
          registrationPayment,
          payment,
        );
        if (!markedAsPaid) {
          console.error(`Could not reconcile paid Razorpay order ${order.id}.`);
        }
      } else if (registrationPayment) {
        console.error(
          `Razorpay order.paid webhook did not match registration order ${order.id}.`,
        );
      }
      return res.sendStatus(200);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("Registration payment webhook processing failed:", error);
    return res.status(500).json({
      success: false,
      message: "Webhook processing failed.",
    });
  }
};
