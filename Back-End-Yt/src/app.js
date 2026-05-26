import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const app = express();
const upload = multer({dest: 'uploads/'})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleswares
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true, limit: "16KB" }));
app.use(express.json({ limit: "16KB" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());


//import routers
import userRouter from './routes/user.route.js';

app.use("/api/v1/users",userRouter);

export { app };
