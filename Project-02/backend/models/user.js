import mongoose from "mongoose";

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

// Creating the model for our database .. here we have written the User which will converted into users (always in plural and lowercase) collection in the database
const User = mongoose.model("User", UserSchema);

export default User;
