import express from "express";
import { sendEmailHandler } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/send-email", sendEmailHandler);

export default router;
