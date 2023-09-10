/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Post = require("../../models/Post");

// GET  /communities/:communityid/posts ? sort = ("new" | "hot (default)" | "top")
exports.GET_POSTS = asyncHandler(async (req, res, next) => {

});

exports.GET_POST = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.statusCode(200).json(req.post);
    }

    return res.statusCode(500).json({ statusCode: 500, msg: "Unable to get post" })
});

exports.ADD_POST = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        const post = new Post({
            user: req.user.id,
            content: {
                text: req.body.text,
                image: req.body.image,
                ref: req.body.ref
            },
            time: new Date()
        });
        await post.save();
        return res.statusCode(200).json({
            statusCode: 200,
            msg: "Successfully added post"
        });
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unsuccessfully added post"
    })

});

// POST /communities/:communityid/post/delete
exports.DELETE_POST = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        // delete post from user
        const postUserIndex = req.user.posts.findIndex((post) => post._id === req.post._id);
        req.user.posts.splice(postUserIndex, postUserIndex + 1);
        await req.user.save();

        // delete post from community
        const postCommunityIndex = req.community.posts.findIndex((post) => post._id === req.post._id);
        req.community.posts.splice(postCommunityIndex, postCommunityIndex + 1);
        await req.community.save();

        // delete comments from post
        req.post.comments.forEach(async (comment) => {
            await Comment.deleteOne({ _id: comment._id});
        })

        // delete post
        await Post.deleteOne({ _id: req.post._id });

        return res.statusCode(200).json({
            statusCode: 200,
            msg: "Successfully deleted post"
        });
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to delete post"
    })
});

// POST /communities/:communityid/posts/:postid/save
exports.SAVE_POST = asyncHandler(async (req, res, next) => {

});

// POST /communities/:communityid/posts/:postid/upvote ? count = (-1 | 1)
exports.UPVOTE_POST = asyncHandler(async (req, res, next) => {

});