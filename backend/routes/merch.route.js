import express from "express";
import { createSportsMerchOrder, createFestMerchOrder } from "../controller/merch.controller.js";

const router = express.Router();

router.post("/sports", createSportsMerchOrder);
router.post("/fest", createFestMerchOrder);

export default router;
