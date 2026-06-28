import SportsMerch from "../models/sportsMerch.model.js";
import FestMerch from "../models/festMerch.model.js";
import { sendMerchVerificationEmail, sendCustomEmail } from "../services/merchEmail.service.js";
import { generateMerchExcel, generateMerchPDF } from "../services/export.service.js";

// ... existing code ...

// POST /api/admin/merch/custom-email
export const sendCustomMerchEmail = async (req, res) => {
    try {
        const { userIds, merchType, subject, message, filters } = req.body;

        if (!subject || !message) {
            return res.status(400).json({ message: "Subject and message are required.", success: false });
        }

        let targets = [];

        if (userIds && userIds.length > 0) {
            // Send to specifically selected users
            const sports = await SportsMerch.find({ _id: { $in: userIds } });
            const fest = await FestMerch.find({ _id: { $in: userIds } });
            targets = [...sports, ...fest];
        } else if (merchType) {
            // Send to all verified users matching filters
            let query = { verified: true };
            if (filters?.academicYear && filters.academicYear !== 'all') query.academicYear = filters.academicYear;
            if (filters?.hostelName) query.hostelName = { $regex: filters.hostelName, $options: "i" };

            if (merchType === "sports") {
                targets = await SportsMerch.find(query);
            } else {
                targets = await FestMerch.find(query);
            }
        } else {
            return res.status(400).json({ message: "No targets specified.", success: false });
        }

        if (targets.length === 0) {
            return res.status(200).json({ success: true, message: "No target users found matching the criteria." });
        }

        const results = await Promise.allSettled(targets.map(user => 
            sendCustomEmail({ email: user.email, subject, message })
        ));

        const successCount = results.filter(r => r.status === 'fulfilled').length;
        const failCount = results.length - successCount;

        return res.status(200).json({
            success: true,
            message: `Custom emails processed. Success: ${successCount}, Failed: ${failCount}`,
        });

    } catch (error) {
        console.error("Send Custom Merch Email Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// GET /api/admin/merch/sports
export const getSportsMerchOrders = async (req, res) => {
    try {
        const { verified, academicYear, hostelName, name } = req.query;
        let query = {};
        if (verified === "true") query.verified = true;
        else if (verified === "false") query.verified = false;
        
        if (academicYear && academicYear !== 'all') query.academicYear = academicYear;
        if (hostelName) query.hostelName = { $regex: hostelName, $options: "i" };
        if (name) query.name = { $regex: name, $options: "i" };

        const orders = await SportsMerch.find(query).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Get Sports Merch Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// GET /api/admin/merch/fest
export const getFestMerchOrders = async (req, res) => {
    try {
        const { verified, academicYear, hostelName, name } = req.query;
        let query = {};
        if (verified === "true") query.verified = true;
        else if (verified === "false") query.verified = false;
        
        if (academicYear && academicYear !== 'all') query.academicYear = academicYear;
        if (hostelName) query.hostelName = { $regex: hostelName, $options: "i" };
        if (name) query.name = { $regex: name, $options: "i" };

        const orders = await FestMerch.find(query).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Get Fest Merch Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// PATCH /api/admin/merch/verify/:type/:id
export const verifyMerchOrder = async (req, res) => {
    try {
        const { type, id } = req.params;
        const { verified } = req.body;

        let order;
        if (type === "sports") {
            order = await SportsMerch.findByIdAndUpdate(id, { verified }, { new: true });
        } else if (type === "fest") {
            order = await FestMerch.findByIdAndUpdate(id, { verified }, { new: true });
        } else {
            return res.status(400).json({ message: "Invalid merch type.", success: false });
        }

        if (!order) {
            return res.status(404).json({ message: "Order not found", success: false });
        }

        return res.status(200).json({ success: true, message: `Order marked as ${verified ? 'verified' : 'unverified'}.`, order });
    } catch (error) {
        console.error("Verify Merch Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// POST /api/admin/merch/send-confirmation-mails
export const sendConfirmationMails = async (req, res) => {
    try {
        // Fetch ALL verified users who haven't been sent confirmation? 
        // The user said: "Send email ONLY to verified users", "Send to multiple users at once", "Avoid sending duplicate emails"
        // I should probably add an 'emailSent' field to the models to track this.
        
        // For now, I'll fetch verified orders. 
        // I'll add an 'emailSent' field to the models in the next step to avoid duplicates.
        
        const sportsOrders = await SportsMerch.find({ verified: true, emailSent: { $ne: true } });
        const festOrders = await FestMerch.find({ verified: true, emailSent: { $ne: true } });

        const allOrders = [...sportsOrders.map(o => ({ ...o._doc, type: 'sports' })), ...festOrders.map(o => ({ ...o._doc, type: 'fest' }))];

        if (allOrders.length === 0) {
            return res.status(200).json({ success: true, message: "No new verified orders to send emails to." });
        }

        const results = await Promise.allSettled(allOrders.map(async (order) => {
            await sendMerchVerificationEmail({ email: order.email, name: order.name });
            
            // Mark as email sent
            if (order.type === 'sports') {
                await SportsMerch.findByIdAndUpdate(order._id, { emailSent: true });
            } else {
                await FestMerch.findByIdAndUpdate(order._id, { emailSent: true });
            }
        }));

        const successCount = results.filter(r => r.status === 'fulfilled').length;
        const failCount = results.length - successCount;

        return res.status(200).json({
            success: true,
            message: `Batch email sending complete. Success: ${successCount}, Failed: ${failCount}`,
        });

    } catch (error) {
        console.error("Send Bulk Mails Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Export to Excel: GET /api/admin/merch/export/excel/:type
export const exportMerchExcel = async (req, res) => {
    try {
        const { type } = req.params;
        const { verified, academicYear, hostelName, name } = req.query;
        let query = {};
        
        if (verified === "true") query.verified = true;
        else if (verified === "false") query.verified = false;
        if (academicYear && academicYear !== 'all') query.academicYear = academicYear;
        if (hostelName) query.hostelName = { $regex: hostelName, $options: "i" };
        if (name) query.name = { $regex: name, $options: "i" };

        const orders = type === "sports" 
            ? await SportsMerch.find(query).sort({ createdAt: -1 })
            : await FestMerch.find(query).sort({ createdAt: -1 });

        await generateMerchExcel({ type, orders, res });
        res.status(200).end();

    } catch (error) {
        console.error("Export Excel Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

// Download PDF: GET /api/admin/merch/export/pdf/:type
export const exportMerchPDF = async (req, res) => {
    try {
        const { type } = req.params;
        const { verified, academicYear, hostelName, name } = req.query;
        let query = {};
        
        if (verified === "true") query.verified = true;
        else if (verified === "false") query.verified = false;
        if (academicYear && academicYear !== 'all') query.academicYear = academicYear;
        if (hostelName) query.hostelName = { $regex: hostelName, $options: "i" };
        if (name) query.name = { $regex: name, $options: "i" };

        const orders = type === "sports" 
            ? await SportsMerch.find(query).sort({ createdAt: -1 })
            : await FestMerch.find(query).sort({ createdAt: -1 });

        await generateMerchPDF({ type, orders, res });

    } catch (error) {
        console.error("Export PDF Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
