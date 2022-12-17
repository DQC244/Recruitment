import express from "express";
import {
  addCompany,
  approveCompany,
  deleteCompany,
  getCompany,
  getCompanyDetail,
  updateCompanyDetail,
} from "../controllers/company";
import { verifyToken } from "../verifyToken";
import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyToken, addCompany);

// delete
router.delete("/delete/:id", verifyToken, deleteCompany);

// get all
router.get("/get", getCompany);

// get detail
router.get("/get/:id", getCompanyDetail);

// update
router.put("/update/:id", verifyToken, updateCompanyDetail);

// approve
router.put("/approve/:id", verifyTokenAdmin, approveCompany);

export default router;
