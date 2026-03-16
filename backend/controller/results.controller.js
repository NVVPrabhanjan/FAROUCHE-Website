import resultsModel from "../models/results.model.js";
import AuditLog from "../models/auditLog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addResults = async (req, res) => {
  try {
    const { name, teams, matchType, manofthematch, winner, runner, category, hostelType, runnerType } = req.body;
    console.log("1");
    let imageWinner, imageRunner, ManOftheMatchImage;
    const existingResult = await resultsModel.findOne({ name, matchType });
    console.log("2");
    if (existingResult) {
      return res.status(400).json({
        message: `${matchType} result already exists for ${name}`,
      });
    }
    console.log("3");
    if (matchType === "Finals") {
      if (!req.files || !req.files.winnerImg || !req.files.runnerImg) {
        return res.status(400).json({ message: "Winner and runner images are required for finals." });
      }
      console.log("4");
      const winnerUpload = await uploadOnCloudinary(req.files.winnerImg[0].path);
      const runnerUpload = await uploadOnCloudinary(req.files.runnerImg[0].path);
      console.log("5");
      imageWinner = winnerUpload.url;
      imageRunner = runnerUpload.url;
    } else {
      if (!req.files || !req.files.winnerImg) {
        return res.status(400).json({ message: "Winner image is required." });
      }
      console.log("6");
      const winnerUpload = await uploadOnCloudinary(req.files.winnerImg[0].path);
      console.log("7");
      imageWinner = winnerUpload.url;
    }
    console.log("8");
    if (req.files?.manOfTheMatchImg?.[0]) {
      console.log("9");
      const motmUpload = await uploadOnCloudinary(req.files.manOfTheMatchImg[0].path);
      ManOftheMatchImage = motmUpload.url;
    }
    console.log("10");
    const newResult = await resultsModel.create({
      name,
      teams,
      matchType,
      winner,
      runner,
      ManOftheMatch: manofthematch,
      ManOftheMatchImage,
      category,
      hostelType,
      runnerType,
      imageWinner,
      imageRunner,
    });
    console.log("11");
    await AuditLog.create({
      adminId: req.admin._id,
      adminName: req.admin.username,
      adminRole: req.admin.role,
      action: "ADD_RESULT",
      detail: `Added result for "${name}" — ${matchType}`,
    });
    console.log("12");
    res.status(201).json({
      message: "Result added successfully.",
      data: newResult,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add result.",
      error: error.message,
    });
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
