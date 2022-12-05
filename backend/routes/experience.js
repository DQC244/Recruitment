import express from "express";
import {
  addExperience,
  deleteExperience,
  getExperience,
} from "../controllers/experience";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addExperience);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deleteExperience);

// get all
router.get("/get", getExperience);

export default router;
