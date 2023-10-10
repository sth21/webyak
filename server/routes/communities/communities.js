const router = require("express").Router();
const passport = require("passport");

const { COMMUNITY_ID, GET_COMMUNITIES, JOIN_COMMUNITY, LEAVE_COMMUNITY } = require("../../controllers/communities/communities");
const { POST_ID } = require("../../controllers/communities/posts");
const { COMMENT_ID } = require("../../controllers/communities/comments");

const PostsRouter = require("./posts");
const CommentsRouter = require("./comments");

router.use(passport.authenticate("jwt", { session: false }));

router.param("communityid", COMMUNITY_ID);

router.param("postid", POST_ID);

router.param("commentid", COMMENT_ID);

router.get("/communities", GET_COMMUNITIES);

router.post("/communities/:communityid/join", JOIN_COMMUNITY);

router.get("/communities/:communityid/leave", LEAVE_COMMUNITY);

router.use("/communities/:communityid/posts", PostsRouter);

router.use("/communities/:communityid/posts/:postid/comments", CommentsRouter);



module.exports = router;