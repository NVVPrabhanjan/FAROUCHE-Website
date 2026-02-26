import Registration from "../models/registration.model.js";
import Event from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { publishEmailJob } from "../email-producer/kafka.producer.js";

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



    const eventTitle = event.title;
    const teamSize = event.teamSize;

    let imageUrl = "";
    if (eventTitle.toLowerCase() === "mh cricket") {
      if (!req.file || !req.file.path) {
        return res
          .status(400)
          .json({ message: "Image is required for MH Cricket registration." });
      }

      const cloudinaryResult = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResult || !cloudinaryResult.url) {
        return res
          .status(500)
          .json({ message: "Failed to upload image to Cloudinary." });
      }

      imageUrl = cloudinaryResult.url;
    }

    const newRegistration = new Registration({
      name,
      phoneNumber,
      email,
      hostelName,
      year,
      eventId: event.id,
      teamMembers,
      image: imageUrl || undefined,
    });

    const savedRegistration = await newRegistration.save();


    await publishEmailJob({
      type: "registration_confirmation",
      payload: {
        to: email,
        name,
        eventTitle,
        venue: event.venue,
        teamMembers: teamMembers ?? [],
      },
    });

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
