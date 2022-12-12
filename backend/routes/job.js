import express from "express";
import {
  addJob,
  deleteJob,
  getJobList,
  getJobDetail,
  getMyJob,
} from "../controllers/job";
import { verifyToken } from "../verifyToken";

const router = express.Router();

// add
router.post("/add", verifyToken, addJob);

// delete
router.delete("/delete/:id", verifyToken, deleteJob);

// get all
router.get("/get", getJobList);

// // get detail
router.get("/get/:id", getJobDetail);

// get all my job
router.post("/get/self", verifyToken, getMyJob);

export default router;
