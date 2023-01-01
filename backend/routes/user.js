import express from "express";
import {
  changePassword,
  deleteUser,
  getUser,
  getUserList,
  selfUser,
  updateUser,
} from "../controllers/user";
import { verifyToken } from "../verifyToken";
import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// update user
router.put("/update/:id", verifyToken, updateUser);

// change password
router.put("/change-password", verifyToken, changePassword);

// delete user
// router.delete("/delete/:id", verifyTokenAdmin, deleteUser);

// get user
router.get("/find/:id", getUser);

// get user list
router.post("/get-list/", verifyTokenAdmin, getUserList);

// get user with token
router.post("/self", verifyToken, selfUser);

// verify admin
router.post("/verify-admin", verifyTokenAdmin, (req, res, next) => {
  try {
    res.status(200).json("Success!");
  } catch (error) {
    next(error);
  }
});



export default router;
