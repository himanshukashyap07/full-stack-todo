import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
configDotenv();

const app = express();


app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
));

app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(cookieParser());

//import routes
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";

app.use("api/user",userRouter);
app.use("api/todo",todoRouter)


export {app}