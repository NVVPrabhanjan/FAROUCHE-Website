import express from 'express'
import connectDB from './utils/db.js';
import cors from "cors";
import galleryRoute from './routes/gallery.route.js'
import dotenv from "dotenv";
const app = express();
app.use(express.json());
const corsOptions = {
    origin: ['http://139.59.85.84:3000','https://farouche25.tech','https://farouche-website.vercel.app', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
};
app.use(cors(corsOptions));
dotenv.config({});
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use("/api/v1/gallery",galleryRoute)
const PORT = 4001;
app.listen(PORT, () =>{
    connectDB();
    console.log("Server is running")
})