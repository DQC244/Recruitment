import express from "express";
import { addPackage, deletePackage, getPackage } from "../controllers/package";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addPackage);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deletePackage);

// get all
router.get("/get", getPackage);

export default router;
