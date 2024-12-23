import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        trim: true,
    },
    eventid: {
        type: String,
        unique: true,
        default: function() {
            return `EVT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        },
    },
}, {
    timestamps: true,
});


export default mongoose.model("Event", eventSchema);
