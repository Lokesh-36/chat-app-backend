import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

// Required for __dirname in ES modules
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

// Allow frontend origin on Vercel (you can replace this URL accordingly)
app.use(
  cors({
    origin: "https://chat-app-frontend-three-liard.vercel.app/", // ✅ update this
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ❌ REMOVE frontend serving logic since Vercel handles it

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
