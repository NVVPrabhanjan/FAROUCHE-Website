import Event from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addEvent = async (req, res) => {
  try {
    const { title, description, date, venue } = req.body;
    if (!req.file) {
        return res.status(400).json({ message: "Image file is required." });
    }
    const imagePath = req.file.path;
    const imageUrl = await uploadOnCloudinary(imagePath);

    if (!imageUrl) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      venue,
      image: imageUrl.url,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      message: "Event added successfully.",
      data: savedEvent,
      eventId: savedEvent._id,  // Include eventId for later use in registration
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add event.", error: error.message });
  }
};
