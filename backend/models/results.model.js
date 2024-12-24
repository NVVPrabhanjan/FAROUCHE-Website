import { Schema, model } from "mongoose";

const ResultSchema = new Schema(
  {
    name: { type: String, required: true },
    teams: { type: String, required: true },
    win: {type: String, required: true},
    manoftheman: { type: String, required: true },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

export default model("Result", ResultSchema);
