import express from "express";
import {
  addCompany,
  deleteCompany,
  getCompany,
  getCompanyDetail,
} from "../controllers/company";
import { verifyToken } from "../verifyToken";

const router = express.Router();

// add
router.post("/add", verifyToken, addCompany);

// delete
router.delete("/delete/:id", verifyToken, deleteCompany);

// get all
router.get("/get", getCompany);

// get detail
router.get("/get/:id", getCompanyDetail);

export default router;
