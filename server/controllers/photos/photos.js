const asyncHandler = require("express-async-handler");
const { gfs } = require("../../multer");

exports.GET_PHOTO = asyncHandler(async (req, res, next) => {
    if (req.post) {
        const { filename } = req.post.photo;
        const readStream = gfs.createReadStream({ filename });
        readStream.pipe(res);
    }

    next();
});

exports.DELETE_PHOTO = asyncHandler(async (req, res, next) => {
    if (req.post) {
        const { filename } = req.post.photo;
        
        gfs.remove({ filename }, (err) => {
            if (err) {
                return res.status(500).json({ statusCode: 500, msg: "Unable to delete photo in post" });
            }
            return null;
        });
    }

    next();
});