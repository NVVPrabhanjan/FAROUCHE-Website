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
    const uploadResults = await Promise.all(uploadPromises);

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
