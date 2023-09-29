/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Post = require("../../models/Post");
const Photo = require("../../models/Photo");
const { gfs } = require("../../multer");

exports.POST_ID = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postid).populate().exec();
    req.post = post;
    next();
});

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

    if (result.isEmpty()) {
        // form photo is file uploaded
        let photo;

        if (req.file) {
            photo = new Photo({
                length: req.file.length,
                chunkSize: req.file.chunkSize,
                uploadDate: req.file.uploadDate,
                filename: req.file.filename,
                contentType: req.file.contentType,
            });

            await photo.save();
        }

        // form post
        const post = new Post({
            user: req.user.id,
            content: {
                text: req.body.text,
                photo,
            },
            time: new Date(),
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

exports.SAVE_POST = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        req.user.savedPosts.push(req.post._id);
        await req.user.save();
        return res.statusCode(200).json({
            statusCode: 200,
            msg: "Successfully saved post"
        });
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to save post"
    });
});

exports.UPVOTE_POST = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        req.post.upVotes += req.query.count;
        await req.post.save();
        return res.statusCode(200).json({
            statusCode: 200,
            msg: "Successfully upvoted post"
        });
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to upload post"
    });
});