require("dotenv").config();

const router = require("express").Router();
const UPLOAD_PHOTO = require("../../multer-storage")(process.env.MONGO_KEY);

const { COMMENT_ID, ADD_COMMENT, DELETE_COMMENT, UPVOTE_COMMENT } = require("../../controllers/communities/comments");
const { POST_ID } = require("../../controllers/communities/posts");
const { VAL_COMMENT_TEXT, VAL_COMMENT_UPVOTE } = require("../../validators/comment");
const { BLOCK_VIDEOS } = require("../../controllers/photos/photos");

router.param("postid", POST_ID);

router.param("commentid", COMMENT_ID);

router.post("/add", VAL_COMMENT_TEXT, UPLOAD_PHOTO, BLOCK_VIDEOS, ADD_COMMENT);

router.post("/delete/:commentid", DELETE_COMMENT);

router.post("/upvote/:commentid", VAL_COMMENT_UPVOTE, UPVOTE_COMMENT);

module.exports = router;