const router = require("express").Router();
const passport = require("passport");

const { COMMUNITY_ID, GET_COMMUNITIES, JOIN_COMMUNITY, LEAVE_COMMUNITY } = require("../../controllers/communities/communities");
const { POST_ID } = require("../../controllers/communities/posts");
const { COMMENT_ID } = require("../../controllers/communities/comments");

const PostsRouter = require("./posts");
const CommentsRouter = require("./comments");

router.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(500).json({ statusCode: 500, msg: "User needs to log in with credentials" });
    }

    return next();
});

router.use(passport.authenticate("jwt", { session: false }));

router.param("communityid", COMMUNITY_ID);

router.param("postid", POST_ID);

router.param("commentid", COMMENT_ID);

router.get("/", GET_COMMUNITIES);

router.post("/:communityid/join", JOIN_COMMUNITY);

router.get("/:communityid/leave", LEAVE_COMMUNITY);

router.use("/:communityid/posts", PostsRouter);

router.use("/:communityid/posts/:postid/comments", CommentsRouter);



module.exports = router;