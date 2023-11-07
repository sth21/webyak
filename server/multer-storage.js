require("dotenv").config();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = (url) => new GridFsStorage({
  url,
  file: (req, file) => {
    // If it is an image, save to photos bucket
    switch (file.mimetype) {
      case "image/jpeg":
      case "image/png":
      case "image/jpg":
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
});

module.exports = (url) => multer({ storage: storage(url) }).single("photo");