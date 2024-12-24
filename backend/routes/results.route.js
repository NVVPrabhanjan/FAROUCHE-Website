import express from "express"
import { addResult, getResults } from "../controller/results.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = express.Router();

router.route("/addResult").post(upload.single('image'),addResult);
router.route("/getResults").get(getResults);

export default router;