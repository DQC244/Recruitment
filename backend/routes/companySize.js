import express from "express";
import {
  addCompanySize,
  deleteCompanySize,
  getCompanySize,
} from "../controllers/companySize";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addCompanySize);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deleteCompanySize);

// get all
router.get("/get", getCompanySize);

export default router;
