/* eslint-env node */
import 'dotenv/config';
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import connect from "./db/connect.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Single health endpoint (with DB status)
app.get("/health", (_req, res) => {
  const dbState = ["disconnected","connected","connecting","disconnecting"][mongoose.connection.readyState] || "unknown";
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    db: dbState,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on :${PORT}`));

// Connect to Mongo (non-blocking)
connect()
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed:", err?.message));
