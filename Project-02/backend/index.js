import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use(express.json());

// Connection to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/crud-app")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error: ", err));

// Creating the schema for our database
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true },
);

// Creating the model for our database
const User = mongoose.model("User", UserSchema);

// Getting the users list from the database
app.get("/users", async (req, res) => {
  return res.json(await User.find());
});

// Creating a new user in the database
app.post("/user", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "All fields are required" });
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
  });

  return res.status(201).json({ status: "success", data: result });
});

// Updating a user in the database
app.patch("/user/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  return res.json({ status: "success", message: "User updated successfully" });
});

// Deleting a user from the database
app.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "success", message: "User deleted successfully" });
});

app.listen(8000, () => console.log("Server is running on port 8000"));
