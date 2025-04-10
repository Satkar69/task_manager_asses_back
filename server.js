import express from "express";

import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./frameworks/data-services/mongo/connection.js";

import globalExceptionHandler from "./application/exception/index.js";

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaught exception occured!!, shutting down...");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection occurred!!, shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

// body parser for request body
app.use(express.json());

// for logging http requests
app.use(morgan("dev"));

//Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

app.use(cors("*"));

app.all(/(.*)/, async (req, res, next) => {
  const error = new CustomError(`can't find ${req.url} on the server!`, 404);
  next(error);
});

app.use(globalExceptionHandler);

export default app;
