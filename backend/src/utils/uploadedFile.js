import path from "node:path";

export const getUploadedFileData = (file) => ({
  originalName: path.basename(file.originalname),
  mimeType: file.mimetype,
  size: file.size,
  data: file.buffer,
});
