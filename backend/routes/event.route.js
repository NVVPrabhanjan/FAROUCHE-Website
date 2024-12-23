import express from "express"
import { addEvent ,getEvents,updateEventDate } from "../controller/event.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = express.Router();

router.route("/addEvent").post(upload.single('image'),addEvent);
router.route("/getEvents").get(getEvents);
router.route("/updateEventDate").put(updateEventDate);
export default router;