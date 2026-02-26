import { Schema, model } from "mongoose";

const resultSchema = new Schema(
  {
    name: { type: String, required: true },
    teams: { type: String, required: true },
    matchType: {
      type: String,
      enum: ["General", "Finals"],
      required: true,
    },
    winner: { type: String, required: true },
    runner: {
      type: String,
      required: function () {
        return this.matchType === "Finals";
      },
    },
    category: { type: String, required: true },
    hostelType: {
      type: String,
      enum: ["National", "International"],
      required: true,
    },
    runnerType: {
      type: String,
      enum: ["National", "International"],
      required: function () {
        return this.matchType === "Finals";
      },
    },
    imageWinner: { type: String, required: true },
    imageRunner: {
      type: String,
      required: function () {
        return this.matchType === "Finals";
      },
    },
    ManOftheMatch: { type: String, required: false },
    ManOftheMatchImage: { type: String, required: false },
  },
  { timestamps: true }
);

export default model("Result", resultSchema);
