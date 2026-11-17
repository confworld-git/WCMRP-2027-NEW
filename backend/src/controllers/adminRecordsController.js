import mongoose from "mongoose";
import Contact from "../models/Contact.js";
import CommitteeApplication from "../models/CommitteeApplication.js";
import PaperSubmission from "../models/PaperSubmission.js";
import RegistrationPayment from "../models/RegistrationPayment.js";

const RECORD_TYPES = {
  contacts: {
    model: Contact,
    searchable: ["fullName", "email", "serviceRequired", "message"],
    archiveable: true,
    editable: [
      "fullName",
      "email",
      "phone",
      "country",
      "serviceRequired",
      "message",
      "status",
    ],
  },
  committees: {
    model: CommitteeApplication,
    searchable: ["fullName", "email", "organization", "memberCategory"],
    archiveable: true,
    editable: [
      "title",
      "fullName",
      "email",
      "phone",
      "country",
      "memberCategory",
      "organization",
      "department",
      "qualification",
      "professionalExperience",
      "industryExperience",
      "specialization",
      "ceradaAssociated",
      "hIndex",
      "scopusPublications",
      "sciPublications",
      "editorReviewer",
      "foundEventVia",
      "status",
    ],
  },
  papers: {
    model: PaperSubmission,
    searchable: ["paperId", "paperTitle", "authorName", "email"],
    archiveable: true,
    editable: [
      "paperTitle",
      "authorName",
      "coauthors",
      "email",
      "mobile",
      "country",
      "whatsapp",
      "linkedin",
      "facebook",
      "institution",
      "department",
      "designation",
      "submissionType",
      "presentationCategory",
      "presentationType",
      "publicationRequired",
      "conferenceSource",
      "message",
      "status",
    ],
  },
  registrations: {
    model: RegistrationPayment,
    searchable: [
      "registration.firstName",
      "registration.lastName",
      "registration.email",
      "orderId",
      "paymentId",
    ],
    archiveable: false,
    editable: [
      "registration.title",
      "registration.firstName",
      "registration.lastName",
      "registration.certificateName",
      "registration.dateOfBirth",
      "registration.nationality",
      "registration.department",
      "registration.institution",
      "registration.mobile",
      "registration.email",
      "registration.participantCategory",
      "registration.presentationCategory",
      "registration.presentationType",
      "selection.presentationType",
      "selection.feeCategory",
      "selection.feePeriod",
      "selection.journalId",
      "selection.addonIds",
      "selection.membership",
      "amount",
      "currency",
      "status",
      "paidAt",
    ],
  },
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getRecordConfig = (type) =>
  Object.hasOwn(RECORD_TYPES, type) ? RECORD_TYPES[type] : null;

const validateUpdateShape = (type, body, editable) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return "An update object is required.";
  }

  const allowedTopLevel = new Set(
    editable.map((field) => field.split(".")[0]),
  );
  const unknownTopLevel = Object.keys(body).find(
    (field) => !allowedTopLevel.has(field),
  );
  if (unknownTopLevel) {
    return `The field "${unknownTopLevel}" cannot be updated.`;
  }

  if (type !== "registrations") {
    return null;
  }

  for (const section of ["registration", "selection"]) {
    if (body[section] === undefined) {
      continue;
    }
    if (
      !body[section] ||
      typeof body[section] !== "object" ||
      Array.isArray(body[section])
    ) {
      return `The "${section}" update must be an object.`;
    }
    const allowed = new Set(
      editable
        .filter((field) => field.startsWith(`${section}.`))
        .map((field) => field.slice(section.length + 1)),
    );
    const unknownField = Object.keys(body[section]).find(
      (field) => !allowed.has(field),
    );
    if (unknownField) {
      return `The field "${section}.${unknownField}" cannot be updated.`;
    }
  }

  return null;
};

export const validateAdminRecordUpdate = (type, body) => {
  const config = getRecordConfig(type);
  if (!config) {
    return "Unknown record type.";
  }
  return validateUpdateShape(type, body, config.editable);
};

const hasPath = (object, path) => {
  let value = object;
  for (const part of path.split(".")) {
    if (!value || typeof value !== "object" || !(part in value)) {
      return false;
    }
    value = value[part];
  }
  return true;
};

const getPath = (object, path) =>
  path.split(".").reduce((value, part) => value?.[part], object);

const makeSearchFilter = (searchable, search) => {
  if (!search) {
    return {};
  }
  const pattern = new RegExp(escapeRegex(search), "i");
  return { $or: searchable.map((field) => ({ [field]: pattern })) };
};

const removeFileBuffers = (record) => {
  const result = record.toObject();
  for (const field of ["paperFile", "cvFile"]) {
    if (result[field]) {
      delete result[field].data;
    }
  }
  return result;
};

const resolveRecord = (type, id) => {
  const config = getRecordConfig(type);
  if (!config) {
    return { error: "Unknown record type." };
  }
  if (!mongoose.isValidObjectId(id)) {
    return { error: "Invalid record ID." };
  }
  return { config };
};

export const listAdminRecords = async (req, res, next) => {
  const config = getRecordConfig(req.params.type);
  if (!config) {
    return res.status(404).json({
      success: false,
      message: "Unknown record type.",
    });
  }

  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(
    50,
    Math.max(1, Number.parseInt(req.query.limit, 10) || 25),
  );
  const search =
    typeof req.query.search === "string" ? req.query.search.trim().slice(0, 100) : "";
  const filter = makeSearchFilter(config.searchable, search);

  if (config.archiveable) {
    filter.archivedAt =
      req.query.archived === "true" ? { $ne: null } : null;
  }
  if (typeof req.query.status === "string" && req.query.status) {
    filter.status = req.query.status;
  }

  try {
    const [records, total] = await Promise.all([
      config.model
        .find(filter)
        .select("-paperFile.data -cvFile.data")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      config.model.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: records,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const updateAdminRecord = async (req, res, next) => {
  const resolved = resolveRecord(req.params.type, req.params.id);
  if (resolved.error) {
    return res.status(400).json({
      success: false,
      message: resolved.error,
    });
  }

  const { config } = resolved;
  const shapeError = validateAdminRecordUpdate(req.params.type, req.body);
  if (shapeError) {
    return res.status(400).json({
      success: false,
      message: shapeError,
    });
  }

  try {
    const record = await config.model
      .findById(req.params.id)
      .select("-paperFile.data -cvFile.data");
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }

    for (const field of config.editable) {
      if (hasPath(req.body, field)) {
        record.set(field, getPath(req.body, field));
      }
    }
    await record.save();
    return res.status(200).json({
      success: true,
      message: "Record updated.",
      data: removeFileBuffers(record),
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Please check the record details and try again.",
      });
    }
    return next(error);
  }
};

export const setAdminRecordArchived = async (req, res, next) => {
  const resolved = resolveRecord(req.params.type, req.params.id);
  if (resolved.error) {
    return res.status(400).json({
      success: false,
      message: resolved.error,
    });
  }
  if (!resolved.config.archiveable) {
    return res.status(400).json({
      success: false,
      message: "This record type cannot be archived.",
    });
  }
  if (typeof req.body?.archived !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "An archive or restore action is required.",
    });
  }

  try {
    const record = await resolved.config.model.findByIdAndUpdate(
      req.params.id,
      { $set: { archivedAt: req.body.archived ? new Date() : null } },
      { returnDocument: "after", runValidators: true },
    );
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: req.body.archived ? "Record archived." : "Record restored.",
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteAdminRegistration = async (req, res, next) => {
  if (req.params.type !== "registrations") {
    return res.status(400).json({
      success: false,
      message: "Only registration records can be deleted.",
    });
  }
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid record ID.",
    });
  }

  try {
    const record = await RegistrationPayment.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Registration record not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Registration record deleted.",
    });
  } catch (error) {
    return next(error);
  }
};

export const downloadAdminRecordFile = async (req, res, next) => {
  const { type, id } = req.params;
  const model =
    type === "papers"
      ? PaperSubmission
      : type === "committees"
        ? CommitteeApplication
        : null;
  if (!model) {
    return res.status(400).json({
      success: false,
      message: "This record type has no downloadable file.",
    });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid record ID.",
    });
  }

  try {
    const record = await model.findById(id).select(
      type === "papers" ? "paperFile" : "cvFile",
    );
    const file = type === "papers" ? record?.paperFile : record?.cvFile;
    if (!file?.data) {
      return res.status(404).json({
        success: false,
        message: "The uploaded file was not found.",
      });
    }

    const filename = file.originalName
      .replace(/[\r\n"\\]/g, "_")
      .replace(/[^\x20-\x7e]/g, "_");
    const encodedFilename = encodeURIComponent(file.originalName).replace(
      /['()]/g,
      (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
    );
    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodedFilename}`,
      "X-Content-Type-Options": "nosniff",
    });
    return res.status(200).send(file.data);
  } catch (error) {
    return next(error);
  }
};
