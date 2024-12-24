import express from "express"
import { addResults, getResults } from "../controller/results.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = express.Router();

router.route("/addResults").post(upload.single('image'),addResults);
router.route("/getResults").get(getResults);

export default router;