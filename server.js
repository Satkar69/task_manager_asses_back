import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

// body parser for request body
app.use(express.json());

// for logging http requests
app.use(morgan("dev"));

//Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

app.use(cors("*"));

export default app;
