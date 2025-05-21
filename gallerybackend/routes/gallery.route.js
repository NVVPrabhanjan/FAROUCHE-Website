import express from "express";
import { addImages, getImagesByEventName, getAllImages } from "../controller/gallery.controller.js";
import { upload, compressImages } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post(
  "/add",
  upload.array("images"),
  compressImages,
  addImages
);
router.get("/", getAllImages);
router.get("/:eventName", getImagesByEventName);

export default router;
