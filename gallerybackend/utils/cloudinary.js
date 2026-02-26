import { v2 as cloudinary } from 'cloudinary';
import fs from "fs/promises";


cloudinary.config({
  cloud_name: "dra16krtc",
  api_key: "438132666533594",
  api_secret: "CG9BS1tKMSlZGKIqeAbvmzSn5fo"
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    console.log("no local path");
    return null;
  }

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  } finally {
    try {
      await fs.unlink(localFilePath);
    } catch (err) {
      console.warn("Could not delete local file:", err.message);
    }
  }
};

export { uploadOnCloudinary };
