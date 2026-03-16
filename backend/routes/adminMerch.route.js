import express from "express";
import { 
    getSportsMerchOrders, 
    getFestMerchOrders, 
    verifyMerchOrder, 
    sendConfirmationMails,
    exportMerchExcel,
    exportMerchPDF
} from "../controller/adminMerch.controller.js";
import { isAdmin, requireRole } from "../middlewares/admin.middleware.js";

const router = express.Router();

// All routes are protected by isAdmin
router.use(isAdmin);

router.get("/sports", getSportsMerchOrders);
router.get("/fest", getFestMerchOrders);
router.patch("/verify/:type/:id", requireRole("super_admin"), verifyMerchOrder);
router.post("/send-confirmation-mails", requireRole("super_admin"), sendConfirmationMails);
router.get("/export/excel/:type", requireRole("super_admin"), exportMerchExcel);
router.get("/export/pdf/:type", requireRole("super_admin"), exportMerchPDF);

export default router;
