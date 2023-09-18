const passport = require("passport");
const router = require("express").Router;
const asyncHandler = require("express-async-handler");

const { GET_COMMUNITIES, JOIN_COMMUNITY, LEAVE_COMMUNITY } = require("../../controllers/communities/communities");
const PostsRouter = require("./posts");
const CommentsRouter = require("./comments");

const Community = require("../../models/Community");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

router.use("/", passport.authenticate("jwt"));

router.param("communityid", asyncHandler(async (req, res, next) => {
    const community = await Community.findById(req.params.communityid);
    req.community = community;
    next();
}));

router.param("postid", asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postid);
    req.post = post;
    next();
}));

router.param("commentid", asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentid);
    req.comment = comment;
    next();
}));



router.get("/communities", GET_COMMUNITIES);

router.post("/communities/:communityid/join", JOIN_COMMUNITY);

router.get("/communities/:communityid/leave", LEAVE_COMMUNITY);

router.use("/communities/:communityid/posts", PostsRouter);

router.use("/communities/:communityid/posts/:postid/comments", CommentsRouter);



exports.default = router;