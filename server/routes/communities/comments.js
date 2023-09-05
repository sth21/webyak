const router = require("express").Router;
const { ADD_COMMENT, DELETE_COMMENT, UPVOTE_COMMENT } = require("../../controllers/communities/comments");

router.post("/add", ADD_COMMENT);

router.post("/:commentid/delete", DELETE_COMMENT);

router.post("/:commentid/upvote", UPVOTE_COMMENT);



exports.default = router;