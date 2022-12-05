import express from "express";
import {
  changePassword,
  deleteUser,
  getUser,
  selfUser,
  updateUser,
} from "../controllers/user";
import { verifyToken } from "../verifyToken";

const router = express.Router();

// update user
router.put("/update/:id", verifyToken, updateUser);

// change password
router.put("/change-password", verifyToken, changePassword);

// delete user
router.post("/delete/:id", verifyToken, deleteUser);

// get user
router.get("/find/:id", getUser);

// get user with token
router.post("/self", verifyToken, selfUser);

export default router;
