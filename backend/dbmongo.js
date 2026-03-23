import mongoose from "mongoose";
import SportsMerch from "./models/sportsMerch.model.js";

await mongoose.connect("mongodb+srv://supportfarouche_db_user:4OWgY4ivwAfuggtB@cluster0.b9hz54q.mongodb.net/");

// IST → UTC conversion
const cutoff = new Date("2026-03-21T08:48:49Z");

// Final filter
const filter = {
    verified: true,
    createdAt: { $gt: cutoff },
    emailSent: true // optional safety
};

// Step 1: Check count
const count = await SportsMerch.countDocuments(filter);
console.log("Matching verified docs:", count);

// Step 2: Update
const res = await SportsMerch.updateMany(filter, {
    $set: { emailSent: false }
});

console.log("Updated:", res.modifiedCount);

process.exit();