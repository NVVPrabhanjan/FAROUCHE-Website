import express from "express";
import { addResults, deleteResult, getResults } from "../controller/results.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { isAdmin, requireRole } from "../middlewares/admin.middleware.js";

const router = express.Router();


router.get("/getResults", getResults);


router.post(  "/addResults", isAdmin, requireRole("super_admin", "admin"),
  upload.fields([
    { name: "winnerImg",        maxCount: 1 },
    { name: "runnerImg",        maxCount: 1 },
    { name: "manOfTheMatchImg", maxCount: 1 },
  ]),
  addResults
);
router.delete("/results", isAdmin, requireRole("super_admin", "admin"), deleteResult);

export default router;
