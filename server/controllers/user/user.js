const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");

exports.GET_USER_POSTS = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.statusCode(200).json(req.user.posts);
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to get posts"
    });
});

exports.GET_USER_COMMENTS = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.statusCode(200).json(req.user.comments);
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to get comments"
    });
});

exports.GET_USER_SAVED = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.statusCode(200).json(req.user.savedPosts);
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to get saved posts"
    });
});

exports.GET_USER_UPVOTES = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.statusCode(200).json(req.user.upVotes);
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to get upvotes"
    });
});

exports.GET_USER_NOTIFICATIONS = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        return res.statusCode(200).json(req.user.notifications);
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to get notifications"
    });
});