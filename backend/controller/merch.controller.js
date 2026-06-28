import SportsMerch from "../models/sportsMerch.model.js";
import FestMerch from "../models/festMerch.model.js";
import { createRazorpayOrder, verifyRazorpaySignature } from "../services/razorpay.service.js";

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
            size,
            merchNumber,
        } = req.body;

        // Basic validation
        if (!name || !email || !phone || !hostelName || !academicYear || !transactionId || !merchName || !size || merchNumber === undefined) {
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

        // Transaction ID validation (must be exactly 12 digits for manual UPI)
        const txnRegex = /^\d{12}$/;
        if (!txnRegex.test(transactionId)) {
            return res.status(400).json({ message: "Transaction ID must be exactly 12 digits.", success: false });
        }

        // Academic Year validation
        const validYears = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
        if (!validYears.includes(academicYear)) {
            return res.status(400).json({ message: "Invalid academic year.", success: false });
        }

        // Size validation
        const validSizes = ["S", "M", "L", "XL", "XXL"];
        if (!validSizes.includes(size)) {
            return res.status(400).json({ message: "Invalid size. Must be one of S, M, L, XL, XXL.", success: false });
        }

        const newOrder = new SportsMerch({
            name,
            email,
            phone,
            hostelName,
            academicYear,
            transactionId,
            merchName,
            size,
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

// Public: POST /api/merch/fest/create-order
export const createFestRazorpayOrder = async (req, res) => {
    try {
        const amount = 399; // Fixed price for Fest Merch
        const receipt = `fest_merch_${Date.now()}`;
        
        const order = await createRazorpayOrder(amount, receipt);
        
        return res.status(201).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error("Create Razorpay Order Error:", error);
        return res.status(500).json({ message: "Failed to create payment order.", success: false });
    }
};

// Public: POST /api/merch/fest/verify-payment
export const verifyFestRazorpayPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            userDetails // Contains name, email, phone, hostelName, academicYear, size
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userDetails) {
            return res.status(400).json({ message: "Missing payment or user details.", success: false });
        }

        const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (!isValid) {
            return res.status(400).json({ message: "Invalid payment signature.", success: false });
        }

        const newOrder = new FestMerch({
            ...userDetails,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            verified: true, // Auto-verify if payment is successful via Razorpay
        });

        await newOrder.save();

        return res.status(201).json({
            success: true,
            message: "Payment successful and order placed!",
            order: newOrder,
        });
    } catch (error) {
        console.error("Verify Razorpay Payment Error:", error);
        return res.status(500).json({ message: "Server error during payment verification.", success: false });
    }
};

// Keep old flow for manual entries if needed, but updated to handle non-strict transactionId
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
            size,
        } = req.body;

        // Basic validation
        if (!name || !email || !phone || !hostelName || !academicYear || !transactionId || !size) {
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

        // Size validation
        const validSizes = ["S", "M", "L", "XL", "XXL"];
        if (!validSizes.includes(size)) {
            return res.status(400).json({ message: "Invalid size. Must be one of S, M, L, XL, XXL.", success: false });
        }

        const newOrder = new FestMerch({
            name,
            email,
            phone,
            hostelName,
            academicYear,
            transactionId,
            size,
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
