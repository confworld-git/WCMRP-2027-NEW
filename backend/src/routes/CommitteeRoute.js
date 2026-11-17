import express from "express";
import { createCommitteeApplication } from "../controllers/committeeController.js";
import { uploadCommitteeCv } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", uploadCommitteeCv, createCommitteeApplication);

export default router;
