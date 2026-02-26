import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    teamSize:{
      type:Number
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      trim: true,
    },
    eventid: {
      type: String,
      unique: true,
      default: function () {
        return `EVT-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      },
    },
    group: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      adminId:   { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      adminName: { type: String, default: "Unknown" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);
