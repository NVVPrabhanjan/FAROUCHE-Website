import express from "express";
import {createRegistration} from "../controller/registration.controller.js";
const router = express.Router();

router.route("/createRegistration").post(createRegistration);

export default router;