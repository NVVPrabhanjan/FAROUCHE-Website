import multer from "multer";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import sharp from "sharp";


const uploadDir = "./tmp/my-uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


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


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});


export const compressImages = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    await Promise.all(
      req.files.map(async (file) => {
        const originalPath = file.path;
        const tempPath = originalPath + "-compressed.jpg";

        await sharp(originalPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 60 })
          .toFile(tempPath);

        await fsPromises.unlink(originalPath);
        await fsPromises.rename(tempPath, originalPath);
      })
    );
    next();
  } catch (err) {
    console.error("Image compression error:", err);
    return res.status(500).json({ message: "Failed to compress images." });
  }
};
