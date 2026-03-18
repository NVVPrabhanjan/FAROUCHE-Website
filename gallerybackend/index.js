import express from 'express'
import connectDB from './utils/db.js';
import cors from "cors";
import galleryRoute from './routes/gallery.route.js'
import dotenv from "dotenv";
const app = express();
app.use(express.json());
const corsOptions = {
    origin: [
        "https://farouche-website-tqd3.vercel.app/",
        "https://admin.farouche.in/",
        "https://farouche.in",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
    ],
    credentials: true,
};
app.use(cors(corsOptions));
dotenv.config({});
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use("/api/v1/gallery", galleryRoute)
const PORT = 4001;
app.listen(PORT, () => {
    connectDB();
    console.log("Server is running")
})