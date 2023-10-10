const router = require("express").Router();
const upload = require("../../multer-storage");

const { ADD_COMMENT, DELETE_COMMENT, UPVOTE_COMMENT } = require("../../controllers/communities/comments");
const { VAL_COMMENT_TEXT, VAL_COMMENT_UPVOTE } = require("../../validators/comment");

router.post("/add", VAL_COMMENT_TEXT, upload.single("photo"), ADD_COMMENT);

router.post("/:commentid/delete", DELETE_COMMENT);

router.post("/:commentid/upvote", VAL_COMMENT_UPVOTE, UPVOTE_COMMENT);

module.exports = router;