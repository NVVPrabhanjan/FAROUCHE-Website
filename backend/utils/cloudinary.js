import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("no local path");
            return null;
        }

        // Read file into buffer first to avoid Windows file-locking issues
        const fileBuffer = fs.readFileSync(localFilePath);

        const response = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    timeout: 120000,
                    quality: "auto",
                    fetch_format: "auto",
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(fileBuffer);
        });

        return response;
    } catch (error) {
        console.error("Cloudinary upload error:", error.message);
        return null;
    } finally {
        // Clean up the local file — safe now since buffer was used, no lock
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
    }
};

export { uploadOnCloudinary };