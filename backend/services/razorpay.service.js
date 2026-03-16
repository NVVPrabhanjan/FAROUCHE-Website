// import Razorpay from "razorpay";
// import crypto from "crypto";

// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export async function createRazorpayOrder(amount, receipt) {
//     const options = {
//         amount: amount * 100, // Razorpay expects amount in paise
//         currency: "INR",
//         receipt,
//     };
//     const order = await razorpayInstance.orders.create(options);
//     return order;
// }

// export function verifyRazorpaySignature(orderId, paymentId, signature) {
//     const body = orderId + "|" + paymentId;
//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(body)
//         .digest("hex");

//     return expectedSignature === signature;
// }
