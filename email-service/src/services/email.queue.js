import { sendMail } from "./email.service.js";

const queue = [];
let isProcessing = false;

export const addToQueue = (mailOptions) => {
    queue.push(mailOptions);
    processQueue();
};

const processQueue = async () => {
    if (isProcessing) return;
    if (queue.length === 0) return;
    
    isProcessing = true;
    while (queue.length > 0) {
        const mailOptions = queue.shift();
        try {
            await sendMail(mailOptions);
        } catch (error) {
            console.error(`Queue send error to ${mailOptions.to}:`, error.message);
        }
        
        // 100ms delay between emails to avoid Gmail throttling
        await new Promise(res => setTimeout(res, 100));
    }
    isProcessing = false;
};
