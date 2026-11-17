import express from "express";
import { createPaperSubmission } from "../controllers/paperController.js";
import { uploadPaperFile } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", uploadPaperFile, createPaperSubmission);

export default router;
