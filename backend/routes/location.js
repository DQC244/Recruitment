import express from "express";
import {
  addLocation,
  deleteLocation,
  getLocation,
} from "../controllers/location";

import { verifyTokenAdmin } from "../verifyTokenAdmin";

const router = express.Router();

// add
router.post("/add", verifyTokenAdmin, addLocation);

// delete
router.delete("/delete/:id", verifyTokenAdmin, deleteLocation);

// get all
router.get("/get", getLocation);

export default router;
