import express from "express";
import {
  addJob,
  handleDeleteJob,
  getJobList,
  getJobDetail,
  getMyJob,
  handleUpdateJob,
} from "../controllers/job";
import { verifyToken } from "../verifyToken";

const router = express.Router();

// add
router.post("/add", verifyToken, addJob);

// delete
router.delete("/delete/:id", verifyToken, handleDeleteJob);

router.put("/update/:id", verifyToken, handleUpdateJob);
// get all
router.get("/get", getJobList);

// // get detail
router.get("/get/:id", getJobDetail);

// get all my job
router.post("/get-self", verifyToken, getMyJob);

export default router;
