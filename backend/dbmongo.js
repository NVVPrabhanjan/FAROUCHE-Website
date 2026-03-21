import mongoose from "mongoose";
import SportsMerch from "./models/sportsMerch.model.js";

await mongoose.connect("mongodb+srv://supportfarouche_db_user:4OWgY4ivwAfuggtB@cluster0.b9hz54q.mongodb.net/");

const filter = {
    verified: false,
    academicYear: { $in: ["1st Year", "2nd Year", "3rd Year", "4th Year"] }
};

// Step 1: Check count
const count = await SportsMerch.countDocuments(filter);
console.log("Matching docs:", count);

// Step 2: Update
// const res = await SportsMerch.updateMany(filter, {
//     $set: { emailSent: false }
// });

// console.log("Updated:", res.modifiedCount);

process.exit();