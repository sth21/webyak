require("dotenv").config();

const router = require("express").Router();
const UPLOAD_PHOTO = require("../../multer-storage")(process.env.MONGO_KEY);

const { GET_POSTS, GET_POST, ADD_POST, DELETE_POST, SAVE_POST, UPVOTE_POST, POST_ID } = require("../../controllers/communities/posts");
const { BLOCK_VIDEOS } = require("../../controllers/photos/photos");
const { VAL_POST_TEXT, VAL_POST_UPVOTE } = require("../../validators/post");

router.param("postid", POST_ID);

router.get("/", GET_POSTS);

router.post("/add", VAL_POST_TEXT, UPLOAD_PHOTO, BLOCK_VIDEOS, ADD_POST);

router.post("/delete/:postid", DELETE_POST);

router.post("/save", SAVE_POST);

router.post("/upvote", VAL_POST_UPVOTE, UPVOTE_POST);

router.get("/:postid", GET_POST); 

module.exports = router;