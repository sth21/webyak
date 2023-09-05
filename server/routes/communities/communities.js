const router = require("express").Router;

const { GET_COMMUNITIES, JOIN_COMMUNITY, LEAVE_COMMUNITY } = require("../../controllers/communities/communities");
const PostsRouter = require("./posts");
const CommentsRouter = require("./comments");



router.param("communityid")

router.param("postid")

router.param("commentid")



router.get("/communities", GET_COMMUNITIES);

router.post("/communities/:communityid/join", JOIN_COMMUNITY);

router.get("/communities/:communityid/leave", LEAVE_COMMUNITY);

router.use("/communities/:communityid/posts", PostsRouter);

router.use("/communities/:communityid/posts/:postid/comments", CommentsRouter);



exports.default = router;