import multer from "multer";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import sharp from "sharp";

// Ensure the upload directory exists
const uploadDir = "./tmp/my-uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Multer upload with 20MB max limit
export const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max for multer (we'll compress to <10MB later)
  },
});

// Compression middleware to keep images under 10MB for Cloudinary
export const compressImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    await Promise.all(
      req.files.map(async (file) => {
        const originalPath = file.path;
        const tempCompressedPath = originalPath + "-compressed.jpg";

        // Compress to a new file
        await sharp(originalPath)
          .resize({ width: 1920 }) // Resize max width if needed
          .jpeg({ quality: 60 })   // Adjust quality to shrink size <10MB
          .toFile(tempCompressedPath);

        // Replace original file
        await fsPromises.unlink(originalPath);
        await fsPromises.rename(tempCompressedPath, originalPath);
      })
    );

    next();
  } catch (err) {
    console.error("Image compression error:", err);
    return res.status(500).json({ message: "Failed to compress images." });
  }
};
