import User from "../models/user.js";

// Get the users list from the database
export const getUsers = async (req, res) => {
  try {
    return res.json({ status: "success", data: await User.find() });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

// Creating a new user in the database
export const createUser = async (req, res) => {
  try {
    const body = req.body;

    if (!body.firstName || !body.lastName || !body.email || !body.gender) {
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
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Updating a user in the database
export const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
