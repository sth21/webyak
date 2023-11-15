/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Post = require("../../models/Post");
const Photo = require("../../models/Photo");

exports.POST_ID = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postid).populate().exec();
    req.post = post;
    next();
});

// update req.posts = posts;, call next to get img
exports.GET_POSTS = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        const { sort, time, page } = req.params;
        let posts;

        switch (sort) {
            case "new": {

                posts = await Post
                    .find()
                    .sort({time: "desc"})
                    .skip(page * 100)
                    .limit(100)
                    .populate()
                    .exec();
                break;

            } case "top": {

                let range;
                switch (time) {
                    case "1d": {
                        range = new Date() / 1000 - (60 * 60 * 24);
                        break;
                    }
                    case "1w": {
                        range = new Date() / 1000 - (60 * 60 * 24 * 7);
                        break;
                    }
                    default: {
                        range = 0;
                        break;
                    }
                }
                posts = await Post
                    .find()
                    .where("time")
                    .gt(range)
                    .sort({time: "desc", upVotes: "desc"})
                    .skip(page * 100)
                    .limit(100)
                    .populate()
                    .exec();
                break;

            } default: {
                posts = await Post
                    .find()
                    .where("time")
                    .gt(new Date() / 1000 - (60 * 60 * 24))
                    .sort({time: "desc", upVotes: "desc"})
                    .skip(page * 100)
                    .limit(100)
                    .populate()
                    .exec();
                break;
            }
        }

        return res.status(200).json({ statusCode: 200, msg: "Successfully got posts", posts });
    }

    return res.status(500).json({ statusCode: 500, msg: "Could not get posts" });
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

    const hasContent = (req.body.text || req.file);

    if (result.isEmpty() && hasContent) {
        let post;
        let photo;

        if (req.file) {
            photo = new Photo({
                chunkSize: req.file.chunkSize,
                uploadDate: req.file.uploadDate,
                filename: req.file.filename,
                contentType: req.file.contentType,
                photoId: req.file.id
            });

            await photo.save();

            post = new Post({
                user: req.user._id,
                content: {
                    text: req.body.text,
                    photo: photo._id,
                },
                time: new Date(),
            });

            await post.save();
        } else {
            post = new Post({
                user: req.user._id,
                content: {
                    text: req.body.text,
                },
                time: new Date(),
            });

            await post.save();
        }

        // add post to community
        req.community.posts.push(post._id);
        await req.community.save();

        // add post to user
        req.user.posts.push(post._id);
        await req.user.save();

        return res.status(200).json({
            statusCode: 200,
            msg: "Successfully added post"
        });
    }

    return res.status(500).json({
        statusCode: 500,
        msg: "Unsuccessfully added post"
    });
});

exports.DELETE_POST = asyncHandler(async (req, res) => {
    // delete post from user
    const postUserIndex = req.user.posts.findIndex((_id) => _id.equals(req.post._id));

    req.user.posts.splice(postUserIndex, 1);
    await req.user.save();

    // delete post from community
    const postCommunityIndex = req.community.posts.findIndex((_id) => _id.equals(req.post._id));
    req.community.posts.splice(postCommunityIndex, 1);
    await req.community.save();

    // delete comments from post
    req.post.comments.forEach(async (_id) => {
        await Comment.deleteOne({ _id });
    });

    // delete post
    await Post.deleteOne({ _id: req.post._id });

    return res.status(200).json({
        statusCode: 200,
        msg: "Successfully deleted post"
    });
});

exports.SAVE_POST = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        req.user.savedPosts.push(req.post._id);
        await req.user.save();
        return res.status(200).json({
            statusCode: 200,
            msg: "Successfully saved post"
        });
    }

    return res.status(500).json({
        statusCode: 500,
        msg: "Unable to save post"
    });
});

exports.UPVOTE_POST = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    
    if (result.isEmpty()) {
        req.post.upVotes += parseInt(req.query.count, 10);
        await req.post.save();

        return res.status(200).json({
            statusCode: 200,
            msg: "Successfully upvoted post"
        });
    }

    return res.status(500).json({
        statusCode: 500,
        msg: "Unable to upload post"
    });
});