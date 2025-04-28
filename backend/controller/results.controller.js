import resultsModel from "../models/results.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addResults = async (req, res) => {
  try {
    const { name, teams, matchType, manofthematch, winner, runner, category, hostelType, runnerType } = req.body;
    let imageWinner, imageRunner;

    if (matchType === "Finals") {
      if (!req.files || !req.files.winner || !req.files.runner) {
        return res.status(400).json({ message: "Winner and runner images are required for finals." });
      }
      const winnerPath = req.files.winner[0].path;
      const runnerPath = req.files.runner[0].path;
      const winnerUpload = await uploadOnCloudinary(winnerPath);
      const runnerUpload = await uploadOnCloudinary(runnerPath);
      if (!winnerUpload?.url || !runnerUpload?.url) {
        return res.status(500).json({ message: "Image upload failed." });
      }
      imageWinner = winnerUpload.url;
      imageRunner = runnerUpload.url;
    } else {
      if (!req.files || !req.files.winner) {
        return res.status(400).json({ message: "Winner image is required." });
      }
      const winnerPath = req.files.winner[0].path;
      const winnerUpload = await uploadOnCloudinary(winnerPath);
      if (!winnerUpload?.url) {
        return res.status(500).json({ message: "Image upload failed." });
      }
      imageWinner = winnerUpload.url;
      imageRunner = undefined;
    }

    const newResult = new resultsModel({
      name,
      teams,
      matchType,
      winner,
      runner,
      ManOftheMatch: manofthematch,
      category,
      hostelType,
      runnerType,
      imageWinner,
      imageRunner,
    });

    const savedResult = await newResult.save();
    res.status(201).json({ message: "Result added successfully.", data: savedResult });
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
    res
      .status(500)
      .json({ message: "Failed to fetch results.", error: error.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { resultId } = req.body;
    const deletedResult = await resultsModel.findByIdAndDelete(resultId);
    if (!deletedResult) {
      return res.status(404).json({ message: "Result not found." });
    }
    res.status(200).json({
      message: "Result deleted successfully.",
      data: deletedResult,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete result.",
      error: error.message,
    });
  }
};
