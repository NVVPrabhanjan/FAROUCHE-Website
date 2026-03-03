import express from "express";
import { 
  addImages, 
  getImagesByEventName, 
  getAllImages, 
  getGalleryEvents,
  deleteGallery,
  deleteImageFromGallery,
  editGalleryName
} from "../controller/gallery.controller.js";
import { upload, compressImages } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post(
  "/add",
  upload.array("images"),
  compressImages,
  addImages
);
router.get("/", getAllImages);
router.get("/events", getGalleryEvents);
router.get("/:eventName", getImagesByEventName);
router.put("/:eventName", editGalleryName);
router.delete("/:eventName", deleteGallery);
router.delete("/:eventName/image", deleteImageFromGallery);

export default router;
