import express from "express";
import {createRegistration} from "../controller/registration.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = express.Router();

router.route("/createRegistration").post(upload.single('image'),createRegistration);

export default router;