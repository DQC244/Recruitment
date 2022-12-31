import { signup, signIn } from "../controllers";
import express from "express";
import { verifyCode } from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signIn);

router.post("/verify-token", verifyCode);


export default router;
