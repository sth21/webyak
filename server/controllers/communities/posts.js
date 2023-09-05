const asyncHandler = require("express-async-handler");

// GET  /communities/:communityid/posts ? sort = ("new" | "hot (default)" | "top")
exports.GET_POSTS = asyncHandler(async (req, res, next) => {

});

// GET  /communities/:communityid/posts/:postid
exports.GET_POST = asyncHandler(async (req, res, next) => {

});

// POST /communities/:communityid/post/add
exports.ADD_POST = asyncHandler(async (req, res, next) => {

});

// POST /communities/:communityid/post/delete
exports.DELETE_POST = asyncHandler(async (req, res, next) => {

});

// POST /communities/:communityid/posts/:postid/save
exports.SAVE_POST = asyncHandler(async (req, res, next) => {

});

// POST /communities/:communityid/posts/:postid/upvote ? count = (-1 | 1)
exports.UPVOTE_POST = asyncHandler(async (req, res, next) => {

});