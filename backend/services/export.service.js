import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export async function generateMerchExcel({ type, orders, res }) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");
    const filename = type === "sports" ? "Sports_Merch_Orders.xlsx" : "Fest_Merch_Orders.xlsx";

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
}

export async function generateMerchPDF({ type, orders, res }) {
    const title = type === "sports" ? "Sports Merch Orders" : "Fest Merch Orders";
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
        doc.text(`Transaction: ${order.transactionId || order.razorpay_payment_id || 'N/A'}`);
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
}
