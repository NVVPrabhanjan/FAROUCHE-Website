import { publishEmailJob } from "../email-producer/email.service.js";

export async function sendMerchVerificationEmail({ email, name }) {
    return publishEmailJob({
        type: "merch_verified",
        payload: {
            to: email,
            name,
        },
    });
}

// Keeping these for potential use if needed later
export async function sendMerchPurchaseEmail({ email, studentName, hostelName, size, paymentId }) {
    return publishEmailJob({
        type: "merch_purchase",
        payload: {
            to: email,
            studentName,
            hostelName,
            size,
            paymentId,
        },
    });
}
