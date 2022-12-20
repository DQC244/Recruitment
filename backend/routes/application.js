import express from "express";
import { addApplication } from "../controllers/application";

const router = express.Router();

// add
router.post("/add", addApplication);


export default router;
