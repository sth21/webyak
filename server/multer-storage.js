require("dotenv").config();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

/* 
Note for when you end up testing this after the painful testing incident of 10/21: 
Need to make new storage object cuz url wont be accessible for testing. 
Your welcome Sam.
*/

const storage = new GridFsStorage({
  url: process.env.MONGO_KEY,
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

module.exports = multer({ storage });