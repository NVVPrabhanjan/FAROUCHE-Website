import express from "express";
import {
    adminLogin,
    adminSignup,
    getAllEventsAdmin,
    getEventRegistrations,
    markAttendance,
    sendCustomEmail,
    getAllAdmins,
    updateAdminRole,
    getAuditLog,
    updateEventRegistration
} from "../controller/admin.controller.js";
import { isAdmin, requireRole } from "../middlewares/admin.middleware.js";

const router = express.Router();


router.post("/login", adminLogin);
router.post("/signup", adminSignup);


router.get("/events", isAdmin, getAllEventsAdmin);
router.get("/event/:eventId/registrations", isAdmin, getEventRegistrations);
router.put("/event/:eventId/registration", isAdmin, updateEventRegistration);

router.post("/attendance", isAdmin, requireRole("super_admin", "admin"), markAttendance);
router.post("/email", isAdmin, requireRole("super_admin", "admin"), sendCustomEmail);


router.get("/admins", isAdmin, requireRole("super_admin"), getAllAdmins);
router.put("/admins/:adminId/role", isAdmin, requireRole("super_admin"), updateAdminRole);
router.get("/audit-log", isAdmin, requireRole("super_admin"), getAuditLog);

export default router;
