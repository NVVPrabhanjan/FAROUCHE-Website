import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema({
  eventName: { type: String, required: true },
  eventImages: [{ type: String, required: true }],
});

export default mongoose.model("Gallery", gallerySchema);
