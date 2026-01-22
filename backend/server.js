import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import vendorRoute from "./routes/venderRoute.js";
import { cloudinaryConfig } from "./utils/cloudinaryConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middlewares ----------
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://rent-a-ride-two.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("*", cloudinaryConfig);

// ---------- Routes ----------
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/vendor", vendorRoute);

// ---------- Health Check ----------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ---------- Error Handler ----------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ---------- DB ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err);
    process.exit(1);
  });

// ---------- Listen (آخر حاجة) ----------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
