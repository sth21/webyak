const { body, param } = require("express-validator");

exports.VAL_COMMENT_TEXT = body("text")
    .trim()
    .custom((val) => val.length < 300)
    .escape();

exports.VAL_COMMENT_UPVOTE = param("upvote")
    .custom((val) => {
        if (Math.abs(val) === 1) return true;
        throw new Error("Upvote must be 1 or -1");
    });