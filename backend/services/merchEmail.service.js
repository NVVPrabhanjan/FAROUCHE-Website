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

export async function sendCustomEmail({ email, subject, message }) {
    return publishEmailJob({
        type: "custom_email",
        payload: {
            to: email,
            subject,
            message,
        },
    });
}
