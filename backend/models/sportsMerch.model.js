import mongoose from "mongoose";

const sportsMerchSchema = new mongoose.Schema(
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
        merchName: {
            type: String,
            required: true,
            trim: true,
        },
        merchNumber: {
            type: Number,
            required: true,
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

// Compound unique index: (academicYear + merchNumber)
sportsMerchSchema.index({ academicYear: 1, merchNumber: 1 }, { unique: true });

const SportsMerch = mongoose.model("SportsMerch", sportsMerchSchema);
export default SportsMerch;
