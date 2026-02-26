import resultsModel from "../models/results.model.js";
import AuditLog from "../models/auditLog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addResults = async (req, res) => {
  try {
    const { name, teams, matchType, manofthematch, winner, runner, category, hostelType, runnerType } = req.body;
    let imageWinner, imageRunner, ManOftheMatchImage;

    if (matchType === "Finals") {
      if (!req.files || !req.files.winnerImg || !req.files.runnerImg) {
        return res.status(400).json({ message: "Winner and runner images are required for finals." });
      }
      const winnerUpload = await uploadOnCloudinary(req.files.winnerImg[0].path);
      const runnerUpload = await uploadOnCloudinary(req.files.runnerImg[0].path);
      if (!winnerUpload?.url || !runnerUpload?.url) {
        return res.status(500).json({ message: "Image upload failed." });
      }
      imageWinner = winnerUpload.url;
      imageRunner = runnerUpload.url;
    } else {
      if (!req.files || !req.files.winnerImg) {
        return res.status(400).json({ message: "Winner image is required." });
      }
      const winnerUpload = await uploadOnCloudinary(req.files.winnerImg[0].path);
      if (!winnerUpload?.url) {
        return res.status(500).json({ message: "Image upload failed." });
      }
      imageWinner = winnerUpload.url;
      imageRunner = undefined;
    }

    if (req.files?.manOfTheMatchImg?.[0]) {
      const motmUpload = await uploadOnCloudinary(req.files.manOfTheMatchImg[0].path);
      if (motmUpload?.url) {
        ManOftheMatchImage = motmUpload.url;
      }
    }

    const newResult = new resultsModel({
      name, teams, matchType, winner, runner,
      ManOftheMatch: manofthematch,
      ManOftheMatchImage,
      category, hostelType, runnerType,
      imageWinner, imageRunner,
    });

    const savedResult = await newResult.save();

    await AuditLog.create({
      adminId:   req.admin._id,
      adminName: req.admin.username,
      adminRole: req.admin.role,
      action:    "ADD_RESULT",
      detail:    `Added result for: "${name}" — ${matchType}`,
    });

    res.status(201).json({ message: "Result added successfully.", data: savedResult });
  } catch (error) {
    res.status(500).json({ message: "Failed to add result.", error: error.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await resultsModel.find();
    res.status(200).json({ message: "Results fetched successfully.", data: results });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch results.", error: error.message });
  }
};

export const deleteResult = async (req, res) => {
  try {
    const { resultId } = req.body;
    const deletedResult = await resultsModel.findByIdAndDelete(resultId);
    if (!deletedResult) {
      return res.status(404).json({ message: "Result not found." });
    }

    await AuditLog.create({
      adminId:   req.admin._id,
      adminName: req.admin.username,
      adminRole: req.admin.role,
      action:    "DELETE_RESULT",
      detail:    `Deleted result: "${deletedResult.name}"`,
    });

    res.status(200).json({ message: "Result deleted successfully.", data: deletedResult });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete result.", error: error.message });
  }
};
