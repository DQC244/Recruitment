import express from "express";
import { addApplication, getApplication } from "../controllers/application";
import { verifyToken } from "../verifyToken";

const router = express.Router();

// add
router.post("/add", addApplication);

//get 
router.post("/get",verifyToken,getApplication)

export default router;
