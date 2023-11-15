/* eslint-disable no-underscore-dangle */

const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Comment = require("../../models/Comment");
const Photo = require("../../models/Photo");

exports.COMMENT_ID = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentid).populate().exec();
    req.comment = comment;
    next();
});

exports.ADD_COMMENT = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    const hasContent = (req.body.text || req.file);

    if (result.isEmpty() && hasContent) {
        let comment;
        let photo;

        // Add comment
        if (req.file) {
            photo = new Photo({
                chunkSize: req.file.chunkSize,
                uploadDate: req.file.uploadDate,
                filename: req.file.filename,
                contentType: req.file.contentType,
                photoId: req.file.id
            });

            await photo.save();

            comment = new Comment({
                user: req.user._id,
                post: req.post._id,
                content: {
                    text: req.body.text,
                    photo: photo._id,
                },
                time: new Date(),
            });

            await comment.save();
        } else {
            comment = new Comment({
                user: req.user._id,
                post: req.post._id,
                content: {
                    text: req.body.text,
                },
                time: new Date(),
            });

            await comment.save();
        }
        
        // Add comment to post
        req.post.comments.push(comment._id);
        await req.post.save();

        // Add comment to user
        req.user.comments.push(comment._id);
        await req.user.save();

        return res.status(200).json({
            statusCode: 200,
            msg: "Successfully added comment"
        });
    } 
    
    return res.status(500).json({
        statusCode: 500,
        msg: "Unable to add comment"
    });
});

exports.DELETE_COMMENT = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        // delete comment from user
        const commentUserIndex = req.user.comments.findIndex((_id) => _id.equals(req.comment._id));

        req.user.comments.splice(commentUserIndex, 1);
        await req.user.save();

        // delete comment from post
        const commentPostIndex = req.post.comments.findIndex((_id) => _id.equals(req.comment._id));
        req.post.comments.splice(commentPostIndex, 1);
        await req.post.save();

        // delete comment
        await Comment.deleteOne({ _id: req.comment._id });

        return res.status(200).json({
            statusCode: 200,
            msg: "Successfully deleted comment"
        });
    }
    
    return res.status(500).json({
        statusCode: 500,
        msg: "Unable to delete comment"
    });
});

exports.UPVOTE_COMMENT = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        req.comment.upVotes += parseInt(req.query.count, 10);
        await req.comment.save();

        return res.status(200).json({ 
            statusCode: 200, 
            msg: "Successfully upvoted comment`" 
        });
    } 
    
    return res.status(500).json({
        statusCode: 500,
        msg: "Unable to upvote comment"
    });
});