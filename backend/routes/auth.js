import { signup, signIn } from "../controllers";
import express from "express";

const router = express.Router();

router.post("/signup", signup);

router.post("/signIn", signIn);

export default router;
