import SportsMerch from "../models/sportsMerch.model.js";
import FestMerch from "../models/festMerch.model.js";

// Public: POST /api/merch/sports
export const createSportsMerchOrder = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            hostelName,
            academicYear,
            transactionId,
            merchName,
            merchNumber,
        } = req.body;

        // Basic validation
        if (!name || !email || !phone || !hostelName || !academicYear || !transactionId || !merchName || merchNumber === undefined) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address.", success: false });
        }

        // Phone validation (basic)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number. Must be 10 digits.", success: false });
        }

        // Academic Year validation
        const validYears = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
        if (!validYears.includes(academicYear)) {
            return res.status(400).json({ message: "Invalid academic year.", success: false });
        }

        const newOrder = new SportsMerch({
            name,
            email,
            phone,
            hostelName,
            academicYear,
            transactionId,
            merchName,
            merchNumber,
            verified: false,
        });

        await newOrder.save();

        return res.status(201).json({
            success: true,
            message: "Your purchase request has been submitted. Your transaction will be verified by the admin. Once verified, you will receive a confirmation email.",
            order: newOrder,
        });

    } catch (error) {
        console.error("Create Sports Merch Error:", error);
        
        // Handle duplicate key error (academicYear + merchNumber)
        if (error.code === 11000) {
            return res.status(400).json({
                message: "This merch number is already taken for the selected academic year.",
                success: false,
            });
        }

        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Public: POST /api/merch/fest
export const createFestMerchOrder = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            hostelName,
            academicYear,
            transactionId,
        } = req.body;

        // Basic validation
        if (!name || !email || !phone || !hostelName || !academicYear || !transactionId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address.", success: false });
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number. Must be 10 digits.", success: false });
        }

        // Academic Year validation
        const validYears = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
        if (!validYears.includes(academicYear)) {
            return res.status(400).json({ message: "Invalid academic year.", success: false });
        }

        const newOrder = new FestMerch({
            name,
            email,
            phone,
            hostelName,
            academicYear,
            transactionId,
            verified: false,
        });

        await newOrder.save();

        return res.status(201).json({
            success: true,
            message: "Your purchase request has been submitted. Your transaction will be verified by the admin. Once verified, you will receive a confirmation email.",
            order: newOrder,
        });

    } catch (error) {
        console.error("Create Fest Merch Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
