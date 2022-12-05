import express from "express";
import {
  addQualification,
  deleteQualification,
  getQualification,
} from "../controllers/qualification";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addQualification);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deleteQualification);

// get all
router.get("/get", getQualification);

export default router;
