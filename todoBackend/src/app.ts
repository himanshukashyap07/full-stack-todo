import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
configDotenv();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Parse JSON bodies (for API clients sending JSON)
app.use(express.json({ limit: "16kb" }));
// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);


export {app}