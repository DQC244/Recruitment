import express from "express";
import { addJobType, deleteJobType, getJobType } from "../controllers/jobType";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addJobType);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deleteJobType);

// get all
router.get("/get", getJobType);

export default router;
