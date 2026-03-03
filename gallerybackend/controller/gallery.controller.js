import galleryModel from "../models/gallery.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addImages = async (req, res) => {
  try {
    const { eventName } = req.body;
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image file is required." });
    }
    const uploadPromises = req.files.map((file) => {
      return uploadOnCloudinary(file.path);
    });
    console.log(uploadPromises);
    const uploadResults = await Promise.all(uploadPromises);
    console.log(uploadResults);
    let imageUrls = uploadResults;
    imageUrls = imageUrls
      .map((result) => result?.url)
      .filter((res) => res !== undefined);
    if (imageUrls.length === 0) {
      return res
        .status(500)
        .json({ message: "Failed to upload images to Cloudinary." });
    }
    const event = await galleryModel.find({eventName});
    if (event.length==0) {
      const newEvent = new galleryModel({
        eventName,
        eventImages: imageUrls,
      });

      const savedEvent = await newEvent.save();
      res.status(201).json({
        message: "Event added successfully.",
        data: savedEvent,
        eventId: savedEvent._id,
      });
    } else {
      const savedEvent = await galleryModel.findOneAndUpdate(
        { eventName },
        { $push: { eventImages: { $each: imageUrls } } },
        { new: true }
      );
      res.status(201).json({
        message: "Event added successfully.",
        data: savedEvent,
        eventId: savedEvent._id,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add event.", error: error.message });
  }
};

export const getImagesByEventName = async (req, res) => {
  try {
    const { eventName } = req.params;

    const event = await galleryModel.findOne({ eventName });

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json({
      message: "Images fetched successfully.",
      eventName: event.eventName,
      images: event.eventImages,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch images.",
      error: error.message,
    });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const galleries = await galleryModel.find({}, "eventName eventImages");

    const images = galleries.flatMap((event) =>
      event.eventImages.map((image) => ({
        eventName: event.eventName,
        imageUrl: image,
      }))
    );

    res.status(200).json({
      message: "All images fetched successfully.",
      images,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch images.",
      error: error.message,
    });
  }
};

// Fetch raw events with their arrays intact
export const getGalleryEvents = async (req, res) => {
  try {
    const events = await galleryModel.find({}).sort({ _id: -1 });
    res.status(200).json({
      message: "Gallery events fetched successfully.",
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch gallery events.",
      error: error.message,
    });
  }
};

// Delete an entire gallery event
export const deleteGallery = async (req, res) => {
  try {
    const { eventName } = req.params;
    const deletedEvent = await galleryModel.findOneAndDelete({ eventName });
    
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json({
      message: `Gallery '${eventName}' deleted successfully.`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete gallery.",
      error: error.message,
    });
  }
};

// Delete a single image from a gallery
export const deleteImageFromGallery = async (req, res) => {
  try {
    const { eventName } = req.params;
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL is required." });
    }

    const updatedEvent = await galleryModel.findOneAndUpdate(
      { eventName },
      { $pull: { eventImages: imageUrl } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json({
      message: "Image deleted successfully from gallery.",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete image.",
      error: error.message,
    });
  }
};

// Edit gallery name
export const editGalleryName = async (req, res) => {
  try {
    const { eventName } = req.params;
    const { newEventName } = req.body;

    if (!newEventName || newEventName.trim() === "") {
      return res.status(400).json({ message: "New event name is required." });
    }

    const existingNameCheck = await galleryModel.findOne({ eventName: newEventName.trim() });
    if (existingNameCheck) {
      return res.status(400).json({ message: "An event with this new name already exists." });
    }

    const updatedEvent = await galleryModel.findOneAndUpdate(
      { eventName },
      { $set: { eventName: newEventName.trim() } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json({
      message: `Gallery renamed to '${newEventName.trim()}'.`,
      event: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to edit gallery name.",
      error: error.message,
    });
  }
};
