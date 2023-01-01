import express from "express";
import { getOrderIncome, getOrderList } from "../controllers/order";
import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// get all
router.post("/get", verifyTokenAdmin, getOrderList);

router.post("/income", verifyTokenAdmin, getOrderIncome);

export default router;
