import Event from "../models/event.model.js";
import AuditLog from "../models/auditLog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addEvent = async (req, res) => {
  const { teamSize, title, description, date, venue, group } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required." });
  }

  const imageUrl = await uploadOnCloudinary(req.file.path);
  if (!imageUrl) {
    return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
  }

  const newEvent = new Event({
    title,
    description,
    date,
    venue,
    image: imageUrl.url,
    group,
    teamSize,
    createdBy: {
      adminId:   req.admin._id,
      adminName: req.admin.username,
    },
  });

  try {
    const savedEvent = await newEvent.save();


    await AuditLog.create({
      adminId:   req.admin._id,
      adminName: req.admin.username,
      adminRole: req.admin.role,
      action:    "ADD_EVENT",
      detail:    `Added event: "${title}"`,
    });

    res.status(201).json({
      message: "Event added successfully.",
      data: savedEvent,
      eventId: savedEvent._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add event.", error: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events.", error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { eventId, title, description, date, venue, teamSize, group } = req.body;

    let query = eventId.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: eventId }
      : { eventid: eventId };

    let updateData = { title, description, date, venue, teamSize, group };

    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      if (imageUrl) updateData.image = imageUrl.url;
    }

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedEvent = await Event.findOneAndUpdate(query, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }


    await AuditLog.create({
      adminId:   req.admin._id,
      adminName: req.admin.username,
      adminRole: req.admin.role,
      action:    "EDIT_EVENT",
      detail:    `Edited event: "${updatedEvent.title}"`,
    });

    res.status(200).json({ message: "Event updated successfully.", data: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to update event.", error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    const query = eventId?.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: eventId }
      : { eventid: eventId };

    const deletedEvent = await Event.findOneAndDelete(query);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }


    await AuditLog.create({
      adminId:   req.admin._id,
      adminName: req.admin.username,
      adminRole: req.admin.role,
      action:    "DELETE_EVENT",
      detail:    `Deleted event: "${deletedEvent.title}"`,
    });

    res.status(200).json({ message: "Event deleted successfully.", data: deletedEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event.", error: error.message });
  }
};

export const getEventPag = async (req, res) => {
  try {
    const event = await Event.find()
      .skip(req.params.skip * 10)
      .limit(req.params.limit * 10);
    res.status(200).json({ data: event });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event.", error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Event.findOne({ eventid: id });
    res.status(200).json({ data, id });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event.", error: error.message });
  }
};
