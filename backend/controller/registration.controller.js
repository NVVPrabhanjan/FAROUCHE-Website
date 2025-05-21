import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import { appendToSheet } from "../gsheetfunctions/register.js";
import axios from "axios";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // adjust path as needed

export const createRegistration = async (req, res) => {
  try {
    const { id, name, year, phoneNumber, email, hostelName, teamMembers } = req.body;

    if (!name || !phoneNumber || !email || !hostelName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const event = await Event.findOne({ eventid: id });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    const existingRegistration = await Registration.findOne({
      email,
      eventId: event.id,
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: "You are already registered for this event.",
      });
    }

    const eventTitle = event.title;
    const teamSize = event.teamSize;

    let imageUrl = "";
    if (eventTitle.toLowerCase() === "mh cricket") {
      if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "Image is required for MH Cricket registration." });
      }

      const cloudinaryResult = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResult || !cloudinaryResult.url) {
        return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
      }

      imageUrl = cloudinaryResult.url;
    }

    const newRegistration = new Registration({
      name,
      phoneNumber,
      email,
      hostelName,
      eventId: event.id,
      teamMembers,
      image: imageUrl || undefined,
    });

    const savedRegistration = await newRegistration.save();

    const sheetData = [
      name,
      year,
      phoneNumber,
      email,
      hostelName,
      eventTitle,
      ...(teamSize > 0 ? teamMembers : []),
      imageUrl
    ];

    try {
      await appendToSheet(sheetData, eventTitle);

      axios.post("http://3.92.134.227:3000/sendMail", {
        name,
        eventTitle,
        venue: event.venue,
        email,
      });
    } catch (error) {
      console.log("Post-registration hook error:", error.message);
    }

    res.status(201).json({
      message: "Registration successful.",
      data: savedRegistration,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register.",
      error: error.message,
    });
  }
};
