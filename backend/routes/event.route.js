import express from "express";
import { addEvent, getEvents, updateEvent, deleteEvent, getEventPag, getEventById } from "../controller/event.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin, requireRole } from "../middlewares/admin.middleware.js";

const router = express.Router();


router.get("/getEvents",  getEvents);
router.get("/getEventPag", getEventPag);
router.get("/getEventID",  getEventById);


router.post(  "/addEvent",    isAdmin, requireRole("super_admin", "admin"), upload.single("image"), addEvent);
router.put(   "/updateEvent", isAdmin, requireRole("super_admin", "admin"), upload.single("image"), updateEvent);
router.delete("/deleteEvent", isAdmin, requireRole("super_admin", "admin"), deleteEvent);

export default router;