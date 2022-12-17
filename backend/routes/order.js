import express from "express";
import { getOrderList } from "../controllers/order";
import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// get all
router.post("/get", verifyTokenAdmin, getOrderList);

export default router;
