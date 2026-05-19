import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/users", getUsers);

router.post("/user", createUser);

router.patch("/user/:id", updateUser);

router.delete("/user/:id", deleteUser);

export default router;
