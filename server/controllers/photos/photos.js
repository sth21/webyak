const asyncHandler = require("express-async-handler");
const gfs = require("../../multer-stream");

exports.DELETE_PHOTO = asyncHandler(async (req, res, next) => {
    if (req.post) {
        const { filename } = req.post.photo;

        gfs.exist({ filename }, (existErr) => {
            if (existErr) {
                return res.status(500).json({ statusCode: 500, msg: "Photo does not exist" });
            }

            gfs.remove({ filename }, (removeErr) => {
                if (removeErr) {
                    return res.status(500).json({ statusCode: 500, msg: "Unable to delete photo in post" });
                }
                return null;
            });

            return null;
        });
    }

    next();
});

exports.BLOCK_VIDEOS = (req, res, next) => {
    if (req.file) {
        switch (req.file.mimetype) {
        case "image/jpeg":
        case "image/png":
        case "image/jpg":
        case "image/heic":
        case "image/webp":
            break;
        default:
            return res.statusCode(500).json({ statusCode: 500, msg: "Cannot upload a video" });
        }
    }

    return next();
}