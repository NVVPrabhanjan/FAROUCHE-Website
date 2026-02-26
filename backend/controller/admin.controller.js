import Admin from "../models/admin.model.js";
import Event from "../models/event.model.js";
import Registration from "../models/registration.model.js";
import AuditLog from "../models/auditLog.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { publishEmailJob } from "../email-producer/kafka.producer.js";

const SUPER_ADMIN_EMAIL = "namakal.is22@bmsce.ac.in";


export const adminSignup = async (req, res) => {
    try {
        const { username, email, password, secretKey } = req.body;

        if (secretKey !== process.env.ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: "Invalid Admin Secret Key. Access Denied.", success: false });
        }

        if (!email.endsWith("@bmsce.ac.in")) {
            return res.status(400).json({ message: "Only @bmsce.ac.in emails are allowed.", success: false });
        }

        const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email or username already exists.", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const role = email === SUPER_ADMIN_EMAIL ? "super_admin" : "viewer";

        const newAdmin = await Admin.create({ username, email, password: hashedPassword, role });


        await AuditLog.create({
            adminId:   newAdmin._id,
            adminName: newAdmin.username,
            adminRole: newAdmin.role,
            action:    "ADMIN_SIGNUP",
            detail:    `New admin signed up: ${username} (${email}) — role: ${role}`,
        });

        const token = jwt.sign(
            { userId: newAdmin._id, role: newAdmin.role },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 86400000, sameSite: "lax" });
        console.log(`Admin Signup: ${email} → role: ${role}`);

        return res.status(201).json({
            message: "Signup successful",
            success: true,
            token,
            admin: { username: newAdmin.username, email: newAdmin.email, role: newAdmin.role },
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await Admin.findOne({ $or: [{ username }, { email: username }] });

        if (!admin) return res.status(401).json({ message: "Invalid credentials", success: false });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials", success: false });


        const token = jwt.sign(
            { userId: admin._id, role: admin.role },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 86400000, sameSite: "lax" });
        console.log(`Admin Login: ${username} (${admin.role})`);

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            admin: { username: admin.username, email: admin.email, role: admin.role },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const getAllEventsAdmin = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        

        const eventsWithCount = await Promise.all(events.map(async (event) => {
            const count = await Registration.countDocuments({ eventId: event._id });
            return {
                ...event.toObject(),
                registrationCount: count
            };
        }));

        return res.status(200).json({
            success: true,
            events: eventsWithCount
        });
    } catch (error) {
        console.error("Get Events Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const getEventRegistrations = async (req, res) => {
    try {
        const { eventId } = req.params;

        const registrations = await Registration.find({ eventId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            registrations
        });
    } catch (error) {
        console.error("Get Registrations Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const markAttendance = async (req, res) => {
    try {
        const { registrationId, status } = req.body;

        const registration = await Registration.findOneAndUpdate(
            { _id: registrationId },
            { attendance: status },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({ message: "Registration not found", success: false });
        }


        await AuditLog.create({
            adminId:   req.admin._id,
            adminName: req.admin.username,
            adminRole: req.admin.role,
            action:    "MARK_ATTENDANCE",
            detail:    `Marked ${registration.name} as ${status ? 'Present' : 'Absent'} (reg: ${registrationId})`,
        });

        return res.status(200).json({
            success: true,
            message: `Attendance marked as ${status ? 'Present' : 'Absent'}`,
            registration
        });
    } catch (error) {
        console.error("Mark Attendance Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const sendCustomEmail = async (req, res) => {
    try {
        console.log("📨 Send Custom Email Request Received");
        const { eventId, userIds, subject, message, whatsappLink } = req.body;

        let registrations;
        if (userIds && userIds.length > 0) {
            registrations = await Registration.find({ _id: { $in: userIds }, eventId });
        } else {
            registrations = await Registration.find({ eventId });
        }

        if (!registrations || registrations.length === 0) {
            return res.status(404).json({ message: "No recipients found", success: false });
        }

        const publishPromises = registrations.map((reg) =>
            publishEmailJob({
                type: "admin_bulk",
                payload: {
                    to: reg.email,
                    name: reg.name,
                    subject: subject || "Update from Farouche 2026",
                    message,
                    whatsappLink,
                },
            })
        );
        await Promise.all(publishPromises);


        await AuditLog.create({
            adminId:   req.admin._id,
            adminName: req.admin.username,
            adminRole: req.admin.role,
            action:    "SEND_EMAIL",
            detail:    `Sent email to ${registrations.length} recipient(s) — subject: "${subject}"`,
        });

        return res.status(200).json({
            success: true,
            message: `${registrations.length} email job(s) queued successfully.`,
        });
    } catch (error) {
        console.error("❌ Send Email Controller Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const getAllAdmins = async (req, res) => {
    try {
        console.log("Get All Admins Request Received");
        const admins = await Admin.find().select("-password").sort({ createdAt: -1 });
        return res.status(200).json({ success: true, admins });
    } catch (error) {
        console.error("Get All Admins Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const updateAdminRole = async (req, res) => {
    try {
        const { adminId } = req.params;
        const { role } = req.body;

        if (![ "admin", "viewer"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role. Only 'admin' or 'viewer' can be assigned.",
                success: false,
            });
        }

        const target = await Admin.findById(adminId);
        if (!target) return res.status(404).json({ message: "Admin not found", success: false });


        if (target.role === "super_admin") {
            return res.status(403).json({ message: "Cannot change the Super Admin's role.", success: false });
        }

        const prevRole = target.role;
        target.role = role;
        await target.save();


        await AuditLog.create({
            adminId:   req.admin._id,
            adminName: req.admin.username,
            adminRole: req.admin.role,
            action:    "ROLE_CHANGE",
            detail:    `Changed ${target.username}'s role: ${prevRole} → ${role}`,
        });

        return res.status(200).json({
            success: true,
            message: `${target.username}'s role updated to '${role}'.`,
            admin: { id: target._id, username: target.username, email: target.email, role: target.role },
        });
    } catch (error) {
        console.error("Update Admin Role Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const getAuditLog = async (req, res) => {
    try {
        const page  = parseInt(req.query.page)  || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip  = (page - 1) * limit;

        const [logs, total] = await Promise.all([
            AuditLog.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            AuditLog.countDocuments(),
        ]);

        return res.status(200).json({
            success: true,
            total,
            page,
            totalPages: Math.ceil(total / limit),
            logs,
        });
    } catch (error) {
        console.error("Get Audit Log Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
