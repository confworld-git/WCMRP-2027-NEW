import nodemailer from "nodemailer";
import { readFile } from "node:fs/promises";

const templatesUrl = new URL("../templates/", import.meta.url);
let transporter;

const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

const renderTemplate = (template, values) =>
  template.replace(/\{\{([\w.]+)\}\}/g, (_placeholder, key) => {
    const value = key.split(".").reduce((current, part) => {
      if (
        current === null ||
        typeof current !== "object" ||
        !Object.hasOwn(current, part)
      ) {
        throw new Error(
          `Missing value for email template placeholder "${key}"`,
        );
      }

      return current[part];
    }, values);

    return escapeHtml(value);
  });

const getTransporter = () => {
  const requiredSettings = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_ADMIN",
    "SMTP_PASS",
    "ADMIN_MAIL",
  ];
  const missingSettings = requiredSettings.filter(
    (setting) => !process.env[setting],
  );

  if (missingSettings.length) {
    throw new Error(
      `Missing SMTP configuration: ${missingSettings.join(", ")}`,
    );
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number.");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_ADMIN,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return transporter;
};

const sendNotifications = async (notifications) => {
  const mailer = getTransporter();
  const from = {
    name: "WCMRP",
    address: process.env.SMTP_ADMIN,
  };
  const deliveries = await Promise.allSettled(
    notifications.map((notification) =>
      mailer.sendMail({ from, ...notification }),
    ),
  );

  const failures = [];
  deliveries.forEach((delivery, index) => {
    const notification = notifications[index];
    const recipients = Array.isArray(notification.to)
      ? notification.to.join(", ")
      : notification.to;
    if (delivery.status === "fulfilled") {
      console.log(
        `Email accepted by SMTP for ${recipients} (${notification.subject}).`,
      );
    } else {
      console.error(
        `Email delivery failed for ${recipients} (${notification.subject}):`,
        delivery.reason,
      );
      failures.push(delivery);
    }
  });

  if (failures.length) {
    const error = new Error(
      "One or more email notifications could not be delivered.",
    );
    error.causes = failures.map((failure) => failure.reason);
    throw error;
  }
};

export const sendContactAdminEmail = async (contact) => {
  const adminTemplate = await readFile(
    new URL("new-inquiry-email.html", templatesUrl),
    "utf8",
  );
  const values = {
    _id: contact._id.toString(),
    fullName: contact.fullName,
    email: contact.email,
    phone: contact.phone || "Not provided",
    country: contact.country,
    serviceRequired: contact.serviceRequired,
    status: contact.status,
    message: contact.message,
    createdAt: new Date(contact.createdAt).toLocaleString(),
    websiteUrl: "https://wcmrp.com",
  };

  await sendNotifications([
    {
      to: process.env.ADMIN_MAIL,
      replyTo: contact.email,
      subject: "New contact inquiry",
      html: renderTemplate(adminTemplate, values),
    },
  ]);
};

export const sendCommitteeApplicationEmails = async (application) => {
  const [adminTemplate, applicantTemplate] = await Promise.all([
    readFile(
      new URL("new-committee-application-email.html", templatesUrl),
      "utf8",
    ),
    readFile(
      new URL("committee-application-received-email.html", templatesUrl),
      "utf8",
    ),
  ]);
  const values = {
    _id: application._id.toString(),
    title: application.title,
    fullName: application.fullName,
    email: application.email,
    phone: application.phone,
    country: application.country,
    memberCategory: application.memberCategory,
    organization: application.organization,
    department: application.department,
    qualification: application.qualification,
    professionalExperience: application.professionalExperience,
    industryExperience: application.industryExperience,
    specialization: application.specialization,
    ceradaAssociated: application.ceradaAssociated,
    hIndex: application.hIndex,
    scopusPublications: application.scopusPublications,
    sciPublications: application.sciPublications,
    editorReviewer: application.editorReviewer,
    foundEventVia: application.foundEventVia,
    cvFile: { originalName: application.cvFile.originalName },
    cvSize: `${(application.cvFile.size / 1024).toFixed(1)} KB`,
    cvUrl: "cid:committee-application-cv",
    status: application.status,
    createdAt: new Date(application.createdAt).toLocaleString(),
    websiteUrl: "https://wcmrp.com",
  };

  await sendNotifications([
    {
      to: process.env.ADMIN_MAIL,
      replyTo: application.email,
      subject: "New organizing committee application",
      html: renderTemplate(adminTemplate, values),
      attachments: [
        {
          filename: application.cvFile.originalName,
          content: application.cvFile.data,
          contentType: application.cvFile.mimeType,
          contentDisposition: "attachment",
          cid: "committee-application-cv",
        },
      ],
    },
    {
      to: application.email,
      subject: "We received your committee application",
      html: renderTemplate(applicantTemplate, values),
    },
  ]);
};

export const sendBrochureAdminEmail = async (brochureRequest) => {
  const template = await readFile(
    new URL("new-brochure-download-email.html", templatesUrl),
    "utf8",
  );
  const values = {
    _id: brochureRequest._id.toString(),
    fullName: brochureRequest.fullName,
    email: brochureRequest.email,
    phone: brochureRequest.phone,
    socialMediaLink: brochureRequest.socialMediaLink,
    discoverySource: brochureRequest.discoverySource,
    createdAt: new Date(brochureRequest.createdAt).toLocaleString(),
  };

  await sendNotifications([
    {
      to: process.env.ADMIN_MAIL,
      replyTo: brochureRequest.email,
      subject: "New brochure download request",
      html: renderTemplate(template, values),
    },
  ]);
};

export const sendPaperSubmissionEmails = async (submission) => {
  const [adminTemplate, senderTemplate] = await Promise.all([
    readFile(
      new URL("new-paper-submission-email.html", templatesUrl),
      "utf8",
    ),
    readFile(
      new URL("paper_submission_replay_mail.html", templatesUrl),
      "utf8",
    ),
  ]);
  const values = {
    _id: submission._id.toString(),
    paperId: submission.paperId,
    paperTitle: submission.paperTitle,
    submissionType: submission.submissionType,
    authorName: submission.authorName,
    coauthors: submission.coauthors || "",
    email: submission.email,
    mobile: submission.mobile,
    country: submission.country,
    whatsapp: submission.whatsapp || "",
    linkedin: submission.linkedin || "",
    facebook: submission.facebook || "",
    institution: submission.institution,
    department: submission.department || "",
    designation: submission.designation || "",
    presentationCategory: submission.presentationCategory,
    presentationType: submission.presentationType,
    publicationRequired: submission.publicationRequired,
    conferenceSource: submission.conferenceSource || "",
    message: submission.message || "",
    paperFile: { originalName: submission.paperFile.originalName },
    paperSize: `${(submission.paperFile.size / 1024).toFixed(1)} KB`,
    status: submission.status,
    createdAt: new Date(submission.createdAt).toLocaleString(),
  };

  await sendNotifications([
    {
      to: process.env.ADMIN_MAIL,
      replyTo: submission.email,
      subject: "New paper submission",
      html: renderTemplate(adminTemplate, values),
      attachments: [
        {
          filename: submission.paperFile.originalName,
          content: submission.paperFile.data,
          contentType: submission.paperFile.mimeType,
        },
      ],
    },
    {
      to: submission.email,
      replyTo: process.env.ADMIN_MAIL,
      subject: "Paper submission received - WCMRP 2027",
      html: renderTemplate(senderTemplate, {
        authorName: submission.authorName,
        paperId: submission.paperId,
      }),
    },
  ]);
};
