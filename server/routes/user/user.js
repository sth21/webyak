const router = require("express").Router();

const passport = require("passport");

const { GET_USER_POSTS, GET_USER_COMMENTS, GET_USER_SAVED, GET_USER_UPVOTES, GET_USER_NOTIFICATIONS } = require("../../controllers/user/user");

router.use(passport.authenticate("jwt"));

router.get("/:userid/posts", GET_USER_POSTS);

router.get("/:userid/comments", GET_USER_COMMENTS);

router.get("/:userid/saved", GET_USER_SAVED);

router.get("/:userid/upvotes", GET_USER_UPVOTES);

router.get("/:userid/notifications", GET_USER_NOTIFICATIONS);



module.exports = router;