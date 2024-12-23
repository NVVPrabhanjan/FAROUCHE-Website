import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";

export const createRegistration = async (req, res) => {
    try {
        const { name, phoneNumber, email, hostelName, eventTitle } = req.body;
        if (!name || !phoneNumber || !email || !hostelName || !eventTitle) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const event = await Event.findOne({ title: eventTitle });
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        const existingRegistration = await Registration.findOne({
            email,
            eventId: event._id
        });

        if (existingRegistration) {
            return res.status(409).json({ message: "You are already registered for this event." });
        }
        const newRegistration = new Registration({
            name,
            phoneNumber,
            email,
            hostelName,
            eventId: event._id,
        });

        const savedRegistration = await newRegistration.save();

        res.status(201).json({
            message: "Registration successful.",
            data: savedRegistration
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to register.", error: error.message });
    }
};
