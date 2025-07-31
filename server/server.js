import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/config/db-config.js";
import cookieParser from "cookie-parser";


import authRouter from "./src/routes/authRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import doctorRouter from "./src/routes/doctorRoutes.js"
import bookingRouter from "./src/routes/bookingRoutes.js"

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors({ 
//   credentials: true, 
//   origin: allowedOrigins 
// }));

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/booking", bookingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});