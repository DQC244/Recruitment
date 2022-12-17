import express from "express";
import {
  addPackage,
  deletePackage,
  getPackage,
  updatePackage,
  verifyPackage,
} from "../controllers/package";
import { verifyToken } from "../verifyToken";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addPackage);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deletePackage);

// get all
router.get("/get", getPackage);

// update all
router.put("/update/:id", verifyTokenAdmin, updatePackage);

router.post("/verify-package", verifyToken, verifyPackage);

export default router;
