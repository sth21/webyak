const asyncHandler = require("express-async-handler");

// POST /auth/login
exports.LOGIN = asyncHandler(async (req, res, next) => {
    // take in email and passport

    // confirm them mfers

    // issue them a jwt iff good
});

// POST /auth/signup
exports.SIGNUP = asyncHandler(async (req, res, next) => {
    // take in email and passport

    // hash and salt passport

    // add them to their school
});

// GET  /auth/logout
exports.LOGOUT = asyncHandler(async (req, res, next) => {
    // remove jwt
});

// POST /auth/delete-account
exports.DELETE_ACCOUNT = asyncHandler(async (req, res, next) => {
    // decrement the number of users in the communities they are in

    // delete their document
});