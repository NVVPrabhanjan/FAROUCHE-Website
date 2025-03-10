import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import { appendToSheet } from "../gsheetfunctions/register.js";
import { sendMail } from "../utils/mail.js";

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

      await sendMail(
        email,
        `Registration Confirmation: ${eventTitle} - Farouche Festival`,
        `Dear ${name},

We are pleased to confirm your registration for "${eventTitle}" as part of the Farouche Festival. 

Event Details:
- Event Name: ${eventTitle}
- Date: ${event.date}
- Venue: ${event.venue}

About the Event:
This event is designed to provide a unique experience, bringing together students for a series of competitions, performances, and interactive sessions. We encourage you to make the most of this opportunity.

Important Guidelines:
- Please carry your hostel ID for verification and entry.
- Stay updated with the official event schedule for any changes.
- Ensure you arrive at the venue on time to avoid any inconvenience.

Support and Assistance:
If you have any questions or require any assistance, feel free to reach out to us.

Email: support@farouche.com
Contact: +1234567890

We look forward to your participation and an enriching experience at "${eventTitle}".

Best Regards,  
Farouche Technical Team`
      );
    } catch (error) {
      console.log(error);
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
