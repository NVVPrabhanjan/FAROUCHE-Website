import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import { appendToSheet } from "../gsheetfunctions/register.js";
import axios from "axios";

export const createRegistration = async (req, res) => {
  try {
    const { id, name, year, phoneNumber, email, hostelName, teamMembers } =
      req.body;

    if (!name || !phoneNumber || !email || !hostelName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const event = await Event.findOne({ eventid: id });
    const userNew = await Registration.findOne({ email, eventId: event.id });
    if (userNew) {
      return res
        .status(400)
        .json({ message: "You are already registered for this event. " });
    }
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const eventTitle = event.title;
    const teamSize = event.teamSize;

    const newRegistration = new Registration({
      name,
      phoneNumber,
      email,
      hostelName,
      eventId: event.id,
      teamMembers,
    });

    const savedRegistration = await newRegistration.save();

    try {
      if (teamSize > 0) {
        await appendToSheet(
          [
            name,
            year,
            phoneNumber,
            email,
            hostelName,
            eventTitle,
            ...teamMembers,
          ],
          eventTitle
        );
      } else {
        await appendToSheet(
          [name, year, phoneNumber, email, hostelName, eventTitle],
          eventTitle
        );
      }

    axios.post("http://3.92.134.227:3000/sendMail",{
	name,
	eventTitle,
	venue:event.venue,
	email
    });
    } catch (error) {
      console.log(error.message);
    }

    res.status(201).json({
      message: "Registration successful.",
      data: savedRegistration,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register.", error: error.message });
  }
};
