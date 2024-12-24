import resultsModel from "../models/results.model";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const addResults = async (req, res) => {
  try {
    const { name, teams, win ,manofthematch } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    const imagePath = req.file.path;
    const imageUrl = await uploadOnCloudinary(imagePath);

    if (!imageUrl) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
    }
    const newResult = new resultsModel({
      name,
      teams,
      win,
      manofthematch,
      image: imageUrl.url,
    });

    const savedResult = await newResult.save();

    res.status(201).json({
      message: "Result added successfully.",
      data: savedResult,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add result.", error: error.message });
  }
};


export const getResults = async (req, res) => {
  try {
    const results = await resultsModel.find();
    res.status(200).json({
      message: "Results fetched successfully.",
      data: results,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch results.", error: error.message });
  }
};
