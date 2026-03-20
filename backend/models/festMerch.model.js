import mongoose from "mongoose";

const festMerchSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        hostelName: {
            type: String,
            required: true,
            trim: true,
        },
        academicYear: {
            type: String,
            required: true,
            enum: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
        },
        transactionId: {
            type: String,
            required: true,
            trim: true,
        },
        size: {
            type: String,
            required: true,
            enum: ["S", "M", "L", "XL", "XXL"],
        },
        verified: {
            type: Boolean,
            default: false,
        },
        emailSent: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const FestMerch = mongoose.model("FestMerch", festMerchSchema);
export default FestMerch;
