require("dotenv").config();

const router = require("express").Router();
const UPLOAD_PHOTO = require("../../multer-storage")(process.env.MONGO_KEY);

const { ADD_COMMENT, DELETE_COMMENT, UPVOTE_COMMENT } = require("../../controllers/communities/comments");
const { VAL_COMMENT_TEXT, VAL_COMMENT_UPVOTE } = require("../../validators/comment");

router.post("/add", VAL_COMMENT_TEXT, UPLOAD_PHOTO, ADD_COMMENT);

router.post("/:commentid/delete", DELETE_COMMENT);

router.post("/:commentid/upvote", VAL_COMMENT_UPVOTE, UPVOTE_COMMENT);

module.exports = router;