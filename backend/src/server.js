import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import {
  ADMIN_SESSION_COOKIE_NAME,
  getAdminCookieOptions,
  getFrontendOrigins,
} from "./config/adminSecurity.js";
import contactRoutes from "./routes/ContactRoute.js";
import brochureRoutes from "./routes/BrochureRoute.js";
import committeeRoutes from "./routes/CommitteeRoute.js";
import paperRoutes from "./routes/PaperRoute.js";
import registrationPaymentRoutes from "./routes/RegistrationPaymentRoute.js";
import adminRoutes from "./routes/AdminRoute.js";
import { handleRegistrationPaymentWebhook } from "./controllers/registrationPaymentController.js";

dotenv.config();

const createApp = () => {
  const app = express();
  const allowedOrigins = new Set(getFrontendOrigins());

  if (process.env.TRUST_PROXY === "1") {
    app.set("trust proxy", 1);
  }

  app.use(
    cors({
      origin: (origin, callback) =>
        callback(null, !origin || allowedOrigins.has(origin)),
      credentials: true,
    }),
  );
  app.use(helmet());
  app.post(
    "/api/registration-payments/webhook",
    express.raw({ type: "application/json" }),
    handleRegistrationPaymentWebhook,
  );
  app.use(express.json({ limit: "32kb" }));
  app.use(
    session({
      name: ADMIN_SESSION_COOKIE_NAME,
      secret: process.env.SESSION_SECRET,
      store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: "admin_sessions",
        ttl: 30 * 24 * 60 * 60,
      }),
      resave: false,
      saveUninitialized: false,
      rolling: false,
      cookie: {
        ...getAdminCookieOptions(),
        maxAge: 8 * 60 * 60 * 1000,
      },
    }),
  );

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "WCMRP Backend Running Successfully",
    });
  });

  app.use("/api/contact", contactRoutes);
  app.use("/api/brochure", brochureRoutes);
  app.use("/api/committee-applications", committeeRoutes);
  app.use("/api/paper-submissions", paperRoutes);
  app.use("/api/registration-payments", registrationPaymentRoutes);
  app.use("/api/admin", adminRoutes);

  app.use((error, _req, res, next) => {
    if (res.headersSent) {
      return next(error);
    }
    console.error("API request failed:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected server error occurred.",
    });
  });

  return app;
};

const startServer = async () => {
  if (Buffer.byteLength(process.env.SESSION_SECRET || "") < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters.");
  }

  await connectDB();
  const app = createApp();
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exitCode = 1;
});
