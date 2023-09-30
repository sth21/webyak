require("dotenv").config();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

const storage = new GridFsStorage({
  url: process.env.MONGO_KEY,
  file: (req, file) => {
    // If it is an image, save to photos bucket
    switch (file.mimetype) {
      case "image/jpeg":
      case "image/png":
      case "image/jpg":
      case "image/gif":
      case "image/heic":
      case "image/webp":
        return {
          bucketName: "photos",
          filename: `${Date.now()}_${file.originalname}`,
        }

      // Else don't save it
      default:
        return null;
    }
  },
})

exports.upload = multer({ storage });

const gfs = Grid(mongoose.connection.db);

exports.gfs = gfs;

