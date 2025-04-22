import { Schema, model } from "mongoose";

const resultSchema = new Schema(
  {
    name: { type: String, required: true },
    teams: { type: String, required: true },
    win: { type: String, required: true },
    manofthematch: { type: String, required: true },
    category: {type: String, required: true},
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Result", resultSchema);
