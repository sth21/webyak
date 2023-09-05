const router = require("express").Router;
const { GET_POSTS, GET_POST, ADD_POST, DELETE_POST, SAVE_POST, UPVOTE_POST } = require("../../controllers/communities/posts");

router.get("/", GET_POSTS);

router.get("/:postid", GET_POST);

router.post("/add", ADD_POST);

router.post("/delete", DELETE_POST);

router.post("/save", SAVE_POST);

router.post("/upvote", UPVOTE_POST);



exports.default = router;