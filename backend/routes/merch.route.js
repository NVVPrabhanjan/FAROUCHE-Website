import express from 'express'
import {
    createSportsMerchOrder,
    createFestMerchOrder,
    createFestRazorpayOrder,
    verifyFestRazorpayPayment
} from "../controller/merch.controller.js";

const router = express.Router();

router.post("/sports", createSportsMerchOrder);
router.post("/fest", createFestMerchOrder);
router.post("/fest/create-order", createFestRazorpayOrder);
router.post("/fest/verify-payment", verifyFestRazorpayPayment);

export default router;
