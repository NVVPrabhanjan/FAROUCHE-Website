import express from "express";
import {
  addResults,
  deleteResult,
  getResults,
} from "../controller/results.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/addResults").post(upload.fields([{ name: "winner", maxCount: 1 },{ name: "runner", maxCount: 1 },]),addResults);
router.route("/getResults").get(getResults);
router.route("/results").delete(deleteResult);

export default router;
