const router = require("express").Router;
const { upload } = require("../../multer");

const { GET_POSTS, GET_POST, ADD_POST, DELETE_POST, SAVE_POST, UPVOTE_POST } = require("../../controllers/communities/posts");
const { VAL_POST_TEXT, VAL_POST_UPVOTE } = require("../../validators/post");

router.get("/", GET_POSTS);

router.get("/:postid", GET_POST);

router.post("/add", VAL_POST_TEXT, upload.single("photo"), ADD_POST);

router.post("/delete", DELETE_POST);

router.post("/save", SAVE_POST);

router.post("/upvote", VAL_POST_UPVOTE, UPVOTE_POST);



exports.default = router;