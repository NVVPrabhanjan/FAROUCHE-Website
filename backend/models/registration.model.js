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
    year: {
        type: String,
        trim: true,
    },
    eventId: {
        type: String,
        ref: "Event"
    },
    teamMembers:{
        type: [String],
    },
    image: {
        type: String,
    },
    attendance: {
        type: Boolean,
        default: false,
    },
    registrationId: {
        type: String,
        unique: true,
        default: function () {
            return `REG-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        }
    }
}, {
    timestamps: true,
});

export default mongoose.model("Registration", registrationSchema);
