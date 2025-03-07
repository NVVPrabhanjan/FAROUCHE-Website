import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import {appendToSheet} from "../gsheetfunctions/register.js";
import { sendMail } from "../utils/mail.js";

export const createRegistration = async (req, res) => {
    try {
        const { name, phoneNumber, email, hostelName, eventTitle } = req.body;
        if (!name || !phoneNumber || !email || !hostelName || !eventTitle ) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const event = await Event.findOne({ title: eventTitle });
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }

        // const existingRegistration = await Registration.findOne({
        //     email,
        //     eventId: event._id
        // });

        // if (existingRegistration) {
        //     return res.status(409).json({ message: "You are already registered for this event." });
        // }
        const newRegistration = new Registration({
            name,
            phoneNumber,
            email,
            hostelName,
            eventId: event._id,
        });

        const savedRegistration = await newRegistration.save();

        try{
        const data= await appendToSheet([name, phoneNumber, email, hostelName, eventTitle],eventTitle).then((data)=>{});

        await sendMail(
            email,
            `Registration Confirmation for ${eventTitle}`,
          `  Hi ${name}, You have successfully registered for ${eventTitle}. Thank you!`,
            `<p>Hi <strong>${name}</strong>,</p>
             <p>You have successfully registered for <strong>${eventTitle}</strong>.</p>
             <p>Thank you for your participation!</p>
             <br>
             <p>Best Regards,</p>
             <p>Event Team</p>`
        );
    }

        catch(error){
            console.log(error)
        }
        res.status(201).json({
            message: "Registration successful.",
            data: savedRegistration
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to register.", error: error.message });
    }
};
