/* eslint-disable no-underscore-dangle */

const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Comment = require("../../models/Comment");
const User = require("../../models/User");

exports.ADD_COMMENT = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        // Create comment
        const comment = new Comment({
            user: req.body.user._id,
            content: req.body.content,
            time: new Date(),
        });
        await comment.save();
        
        // Add comment to post
        req.post.comments.add(comment._id);
        await req.post.save();

        // Add comment to user
        const user = await User.findById(req.user._id);
        user.comments.add(comment._id);
        await user.save();

        return res.statusCode(200).json({
            statusCode: 200,
            msg: "Successfully added comment"
        });
    } 
    
    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to add comment"
    });
});

exports.DELETE_COMMENT = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        // delete from user
        const user = await User.findById(req.user._id);
        user.comments.delete(req.comment._id);
        await user.save();

        // delete from post
        req.post.comments.delete(req.comment._id);
        await req.post.save();

        // delete comment
        await Comment.deleteOne({ _id: req.comment._id });

        // update user webkarma in community
        req.user.communities.set(req.community._id, req.user.communities.get(req.community._id) - req.comment.upVotes);

        return res.statusCode(200).json({
            statusCode: 200,
            msg: "Successfully deleted comment"
        })
    }
    
    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to delete comment"
    });
});

exports.UPVOTE_COMMENT = asyncHandler(async (req, res) => {
    const result = validationResult(req);
    
    const change = (req.params.count === "1") ? 1 : -1;

    if (result.isEmpty()) {
        // Update comment upvotes
        req.comment.upVotes += change;
        await req.comment.save();

        // Add to user's upvoted
        req.user.upVotes.push(req.comment._id);

        // Update user who created comment's webkarma in community
        const user = await User.findById(req.comment.user);
        user.communities.set(req.community._id, user.communities.get(req.community._id) + change);
        await user.save();

        return res.statusCode(200).json({ statusCode: 200, msg: `Successfully ${change === 1 ? "upvoted" : "downvoted"} comment` });
    } 
    
    return res.statusCode(500).json({
        statusCode: 500,
        msg: `Unable to ${change === 1 ? "upvote" : "downvote"} comment`
    });
});