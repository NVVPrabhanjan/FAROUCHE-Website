import mongoose from "mongoose";


const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    hostelName: {
        type: String,
        trim: true,
    },
    eventId: {
        type: String,
        ref: "Event"
    },
}, {
    timestamps: true,
});

export default mongoose.model("Registration", registrationSchema);
