import Event from "../models/event.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addEvent = async (req, res) => {
  const { teamSize,title, description, date, venue, group } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required." });
  }
  const imagePath = req.file.path;
  const imageUrl = await uploadOnCloudinary(imagePath);
  if (!imageUrl) {
    return res
      .status(500)
      .json({ message: "Failed to upload image to Cloudinary." });
  }
  const newEvent = new Event({
    title,
    description,
    date,
    venue,
    image: imageUrl.url,
    group,
    teamSize
  });

  try {
    const savedEvent = await newEvent.save();

    res.status(201).json({
      message: "Event added successfully.",
      data: savedEvent,
      eventId: savedEvent._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add event.", error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ data: events });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch events.", error: error.message });
  }
};

export const updateEventDate = async (req, res) => {
  try {
    const updatedEvent = await Event.findOneAndUpdate(
      { eventid: req.body.eventId },
      { date: req.body.newDate },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Event date updated successfully.",
      data: updatedEvent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update event date.", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({
      eventid: req.body.eventId,
    });

    res
      .status(200)
      .json({ message: "Event deleted successfully.", data: deletedEvent });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete event.", error: error.message });
  }
};

export const getEventPag = async (req, res) => {
  try {
    const event = await Event.find()
      .skip(req.params.skip * 10)
      .limit(req.params.limit * 10);

    res.status(200).json({ data: event });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch event.", error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Event.findOne({
      eventid: id,
    });
    res.status(200).json({ data: data, id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch event.", error: error.message });
  }
};
