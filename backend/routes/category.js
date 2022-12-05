import express from "express";
import {
  addCategory,
  deleteCategory,
  getCategory,
} from "../controllers/category";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addCategory);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deleteCategory);

// get all
router.get("/get", getCategory);

export default router;
