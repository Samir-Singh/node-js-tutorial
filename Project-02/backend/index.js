import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.js";

const app = express();

// middleware to allow cross-origin requests from the frontend application running on http://localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

// middleware to parse the incoming JSON data in the request body and make it available in req.body
app.use(express.json());

// Connection to MongoDB database .. here we are connecting to the local database and creating a new database named crud-app
connectDB("mongodb://127.0.0.1:27017/crud-app");

// routes
app.use("/api", userRouter);

app.listen(8000, () => console.log("Server is running on port 8000"));
