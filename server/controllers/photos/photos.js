const asyncHandler = require("express-async-handler");
const { gfs } = require("../../multer");

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