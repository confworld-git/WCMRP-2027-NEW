import multer from "multer";
import path from "node:path";

const mimeTypesByExtension = {
  ".pdf": ["application/pdf"],
  ".doc": ["application/msword", "application/octet-stream"],
  ".docx": [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
  ],
};

const createUploader = (allowedExtensions, maxFileSize) =>
  multer({
    storage: multer.memoryStorage(),
    fileFilter: (_req, file, cb) => {
      const extension = path.extname(file.originalname).toLowerCase();
      const allowedMimeTypes = mimeTypesByExtension[extension] || [];

      if (
        allowedExtensions.includes(extension) &&
        allowedMimeTypes.includes(file.mimetype)
      ) {
        cb(null, true);
      } else {
        const error = new Error("Unsupported document file type");
        error.code = "UNSUPPORTED_FILE_TYPE";
        cb(error);
      }
    },
    limits: { fileSize: maxFileSize },
  });

const handleUploadError = (upload) => (req, res, next) => {
  upload(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error instanceof multer.MulterError) {
      const fileTooLarge = error.code === "LIMIT_FILE_SIZE";
      return res.status(fileTooLarge ? 413 : 400).json({
        success: false,
        message: fileTooLarge
          ? "The uploaded file exceeds the allowed size."
          : "Please upload one valid document file.",
      });
    }

    if (error.code === "UNSUPPORTED_FILE_TYPE") {
      return res.status(400).json({
        success: false,
        message: "Please upload a supported document file.",
      });
    }

    console.error("Document upload failed:", error);
    return res.status(500).json({
      success: false,
      message: "The document could not be uploaded. Please try again.",
    });
  });
};

const documentExtensions = [".pdf", ".doc", ".docx"];

export const uploadCommitteeCv = handleUploadError(
  createUploader(documentExtensions, 300 * 1024).single("cv"),
);

export const uploadPaperFile = handleUploadError(
  createUploader([".doc", ".docx"], 3 * 1024 * 1024).single("paperFile"),
);

const upload = createUploader(documentExtensions, 300 * 1024);

export default upload;
