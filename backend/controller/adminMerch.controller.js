import SportsMerch from "../models/sportsMerch.model.js";
import FestMerch from "../models/festMerch.model.js";
import { sendMerchVerificationEmail } from "../services/merchEmail.service.js";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

// GET /api/admin/merch/sports
export const getSportsMerchOrders = async (req, res) => {
    try {
        const { verified, academicYear, hostelName } = req.query;
        let query = {};
        if (verified === "true") query.verified = true;
        else if (verified === "false") query.verified = false;
        
        if (academicYear) query.academicYear = academicYear;
        if (hostelName) query.hostelName = { $regex: hostelName, $options: "i" };

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
        const { verified, academicYear, hostelName } = req.query;
        let query = {};
        if (verified === "true") query.verified = true;
        else if (verified === "false") query.verified = false;
        
        if (academicYear) query.academicYear = academicYear;
        if (hostelName) query.hostelName = { $regex: hostelName, $options: "i" };

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
        const { verified, academicYear, hostelName } = req.query;
        let query = {};
        
        if (verified === "true") query.verified = true;
        else if (verified === "false") query.verified = false;
        if (academicYear) query.academicYear = academicYear;
        if (hostelName) query.hostelName = { $regex: hostelName, $options: "i" };

        let orders;
        let filename;

        if (type === "sports") {
            orders = await SportsMerch.find(query).sort({ createdAt: -1 });
            filename = "Sports_Merch_Orders.xlsx";
        } else {
            orders = await FestMerch.find(query).sort({ createdAt: -1 });
            filename = "Fest_Merch_Orders.xlsx";
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Orders");

        if (type === "sports") {
            worksheet.columns = [
                { header: "Name", key: "name", width: 25 },
                { header: "Email", key: "email", width: 30 },
                { header: "Phone", key: "phone", width: 15 },
                { header: "Hostel Name", key: "hostelName", width: 20 },
                { header: "Academic Year", key: "academicYear", width: 15 },
                { header: "Transaction ID", key: "transactionId", width: 25 },
                { header: "Merch Name", key: "merchName", width: 20 },
                { header: "Size", key: "size", width: 10 },
                { header: "Merch Number", key: "merchNumber", width: 15 },
                { header: "Verified Status", key: "verified", width: 15 },
                { header: "Created Date", key: "createdAt", width: 20 },
            ];
        } else {
            worksheet.columns = [
                { header: "Name", key: "name", width: 25 },
                { header: "Email", key: "email", width: 30 },
                { header: "Phone", key: "phone", width: 15 },
                { header: "Hostel Name", key: "hostelName", width: 20 },
                { header: "Academic Year", key: "academicYear", width: 15 },
                { header: "Transaction ID", key: "transactionId", width: 25 },
                { header: "Size", key: "size", width: 10 },
                { header: "Verified Status", key: "verified", width: 15 },
                { header: "Created Date", key: "createdAt", width: 20 },
            ];
        }

        orders.forEach((order) => {
            const rowData = {
                ...order._doc,
                verified: order.verified ? "Verified" : "Pending",
                createdAt: order.createdAt.toLocaleString(),
            };
            worksheet.addRow(rowData);
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

        await workbook.xlsx.write(res);
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
        const { verified, academicYear, hostelName } = req.query;
        let query = {};
        
        if (verified === "true") query.verified = true;
        else if (verified === "false") query.verified = false;
        if (academicYear) query.academicYear = academicYear;
        if (hostelName) query.hostelName = { $regex: hostelName, $options: "i" };

        let orders;
        let title;

        if (type === "sports") {
            orders = await SportsMerch.find(query).sort({ createdAt: -1 });
            title = "Sports Merch Orders";
        } else {
            orders = await FestMerch.find(query).sort({ createdAt: -1 });
            title = "Fest Merch Orders";
        }

        const doc = new PDFDocument({ margin: 30, size: 'A4' });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=${type}_merch_orders.pdf`);

        doc.pipe(res);

        doc.fontSize(20).text(title, { align: 'center' });
        doc.moveDown();

        orders.forEach((order, index) => {
            doc.fontSize(12).text(`${index + 1}. Name: ${order.name}`);
            doc.fontSize(10).text(`Email: ${order.email} | Phone: ${order.phone}`);
            doc.text(`Hostel: ${order.hostelName} | Year: ${order.academicYear}`);
            doc.text(`Transaction ID: ${order.transactionId}`);
            doc.text(`Size: ${order.size || 'N/A'}`);
            if (type === "sports") {
                doc.text(`Merch: ${order.merchName} | Number: ${order.merchNumber}`);
            }
            doc.text(`Status: ${order.verified ? "Verified" : "Pending"}`);
            doc.text(`Date: ${order.createdAt.toLocaleString()}`);
            doc.moveDown(0.5);
            doc.rect(doc.x, doc.y, 500, 1).fill("#eee");
            doc.moveDown(0.5);
        });

        doc.end();

    } catch (error) {
        console.error("Export PDF Error:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};
