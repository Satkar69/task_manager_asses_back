import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((error) => {
      console.error("Database connection error:", error);
    });
};

export default connectDB;
