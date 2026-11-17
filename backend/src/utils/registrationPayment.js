import crypto from "node:crypto";
import Razorpay from "razorpay";

const feeTables = {
  Physical: {
    "Academicians / Delegates / Research Scholars / PhD Candidates": {
      "Early Bird (USD)": 450,
      "Final (USD)": 500,
      "On Spot (USD)": 600,
    },
    "UG / PG Students": {
      "Early Bird (USD)": 425,
      "Final (USD)": 475,
      "On Spot (USD)": 575,
    },
    "Non-Presenter / Attendee / Listener": {
      "Early Bird (USD)": 225,
      "Final (USD)": 250,
      "On Spot (USD)": 350,
    },
  },
  Virtual: {
    "Academicians / Delegates / Research Scholars / PhD Candidates": {
      "Early Bird (USD)": 125,
      "Final (USD)": 150,
    },
    "UG / PG Students": {
      "Early Bird (USD)": 125,
      "Final (USD)": 150,
    },
    "Non-Presenter / Attendee / Listener": {
      "Early Bird (USD)": 100,
      "Final (USD)": 125,
    },
  },
};

const journalPrices = {
  q1: 3000,
  q2: 2000,
  q3: 1600,
  q4: 1000,
};

const addonPrices = {
  tour: 100,
  "abstract-cover": 50,
  "format-research": 100,
  "format-review": 200,
  ppt: 75,
};

const enumValues = {
  title: ["Mr", "Ms", "Mrs", "Dr", "Prof"],
  participantCategory: [
    "Academicians",
    "Delegates",
    "Research scholars",
    "Student",
  ],
  presentationCategory: ["Oral", "Poster"],
  presentationType: ["Virtual", "Physical"],
};

const requiredFields = [
  "title",
  "firstName",
  "lastName",
  "certificateName",
  "dateOfBirth",
  "nationality",
  "department",
  "institution",
  "mobile",
  "email",
  "participantCategory",
  "presentationCategory",
  "presentationType",
];

export const validateRegistrationDetails = (input) => {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Please provide valid registration details.");
  }

  const registration = {};
  for (const field of requiredFields) {
    const value = input[field];
    if (typeof value !== "string" || !value.trim()) {
      throw new Error("Please complete all required registration fields.");
    }

    registration[field] = value.trim();
  }

  const fieldLimits = {
    firstName: 100,
    lastName: 100,
    certificateName: 200,
    nationality: 100,
    department: 150,
    institution: 200,
    mobile: 30,
    email: 150,
  };
  for (const [field, limit] of Object.entries(fieldLimits)) {
    if (registration[field].length > limit) {
      throw new Error(`The ${field} field is too long.`);
    }
  }

  for (const [field, allowedValues] of Object.entries(enumValues)) {
    if (!allowedValues.includes(registration[field])) {
      throw new Error(`Please choose a valid ${field}.`);
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
    throw new Error("Please provide a valid email address.");
  }

  const dateOfBirth = new Date(`${registration.dateOfBirth}T00:00:00.000Z`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(registration.dateOfBirth) ||
    Number.isNaN(dateOfBirth.getTime()) ||
    dateOfBirth.toISOString().slice(0, 10) !== registration.dateOfBirth
  ) {
    throw new Error("Please provide a valid date of birth.");
  }

  if (input.termsAccepted !== true) {
    throw new Error("Please agree to the Terms and Conditions.");
  }

  return registration;
};

export const calculateRegistrationAmount = (selection) => {
  if (!selection || typeof selection !== "object" || Array.isArray(selection)) {
    throw new Error("Please select a registration fee.");
  }

  const { presentationType, feeCategory, feePeriod } = selection;
  const feeTable = Object.hasOwn(feeTables, presentationType)
    ? feeTables[presentationType]
    : null;
  const categoryFees =
    feeTable && Object.hasOwn(feeTable, feeCategory)
      ? feeTable[feeCategory]
      : null;
  const registrationFee =
    categoryFees && Object.hasOwn(categoryFees, feePeriod)
      ? categoryFees[feePeriod]
      : null;
  if (typeof registrationFee !== "number") {
    throw new Error("The selected registration fee is not valid.");
  }

  const journalId = selection.journalId || null;
  if (journalId && !Object.hasOwn(journalPrices, journalId)) {
    throw new Error("The selected publication support option is not valid.");
  }

  if (!Array.isArray(selection.addonIds)) {
    throw new Error("The selected add-ons are not valid.");
  }

  const addonIds = [...new Set(selection.addonIds)];
  if (addonIds.some((id) => !Object.hasOwn(addonPrices, id))) {
    throw new Error("One or more selected add-ons are not valid.");
  }
  if (addonIds.includes("tour") && presentationType !== "Physical") {
    throw new Error("The post-conference tour is for physical participants.");
  }

  if (typeof selection.membership !== "boolean") {
    throw new Error("The membership selection is not valid.");
  }

  const registrationCents = registrationFee * 100;
  const journalCents = (journalId ? journalPrices[journalId] : 0) * 100;
  const addonsCents = addonIds.reduce(
    (total, id) => total + addonPrices[id] * 100,
    0,
  );
  const discountCents = selection.membership
    ? Math.round(registrationCents * 0.05)
    : 0;
  const membershipCents = selection.membership ? 2000 : 0;
  const subtotalCents =
    registrationCents +
    journalCents +
    addonsCents -
    discountCents +
    membershipCents;
  const convenienceCents = Math.round(subtotalCents * 0.06);

  return {
    amount: subtotalCents + convenienceCents,
    currency: "USD",
    selection: {
      presentationType,
      feeCategory,
      feePeriod,
      journalId,
      addonIds,
      membership: selection.membership,
    },
  };
};

export const getRazorpayClient = () => {
  const { RAZORPAY_KEY_ID: key_id, RAZORPAY_KEY_SECRET: key_secret } =
    process.env;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials are not configured.");
  }

  return {
    client: new Razorpay({ key_id, key_secret }),
    keyId: key_id,
    keySecret: key_secret,
  };
};

export const verifyRazorpaySignature = (
  orderId,
  paymentId,
  signature,
  keySecret,
) => {
  if (!/^[a-f\d]{64}$/i.test(signature || "")) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest();
  const provided = Buffer.from(signature, "hex");

  return (
    expected.length === provided.length &&
    crypto.timingSafeEqual(expected, provided)
  );
};

export const verifyRazorpayWebhookSignature = (rawBody, signature, secret) => {
  if (
    !Buffer.isBuffer(rawBody) ||
    !/^[a-f\d]{64}$/i.test(signature || "") ||
    !secret
  ) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest();
  const provided = Buffer.from(signature, "hex");

  return (
    expected.length === provided.length &&
    crypto.timingSafeEqual(expected, provided)
  );
};
