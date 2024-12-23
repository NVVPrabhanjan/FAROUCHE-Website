import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import eventRoute from "./routes/event.route.js";
import registrationRouter from "./routes/registration.route.js";
import bodyParser from "body-parser";
import multer from "multer";

dotenv.config({});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// API Routes
app.use("/api/v1/event", eventRoute);
app.use("/api/v1/registration", registrationRouter);
app.get("/", (req, res) => {
  return res.json({ "Hello": "HI" });
});

app.post("/",(req,res)=>{
console.log(req.body)
  return res.json(200)
})
//var type = multer.single()
const upload = multer(); // Default settings for memory storage
//app.use(upload.none()); // This parses form-data fields


app.post('/upload',upload.single('profilePic'), (req, res) => {
  console.log(req.file)
    // Handle multiple file uploads
    res.send('Files uploaded successfully');
});



app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
