import express from "express"
import { addEvent } from "../controller/event.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = express.Router();

router.route("/addEvent").post(upload.single('image'),addEvent);

export default router;