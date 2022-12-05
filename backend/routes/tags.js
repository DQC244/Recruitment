import express from "express";
import { addTags, deleteTags, getTags } from "../controllers/tags";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addTags);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deleteTags);

// get all
router.get("/get", getTags);

export default router;
