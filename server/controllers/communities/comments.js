const asyncHandler = require("express-async-handler");

// POST /communities/:communityid/posts/:postid/comment/add
exports.ADD_COMMENT = asyncHandler(async (req, res, next) => {

});

// POST /communities/:communityid/posts/:postid/comment/delete
exports.DELETE_COMMENT = asyncHandler(async (req, res, next) => {

});

// POST /communities/:communityid/posts/:postid/comment/upvote ? count = (-1 | 1)
exports.UPVOTE_COMMENT = asyncHandler(async (req, res, next) => {

});