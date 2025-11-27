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


export {app}