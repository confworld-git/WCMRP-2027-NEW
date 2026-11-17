import express from "express";
import { createBrochureRequest } from "../controllers/brochureController.js";

const router = express.Router();

router.post("/", createBrochureRequest);

export default router;
