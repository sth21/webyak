const { body, query } = require("express-validator");

exports.VAL_COMMENT_TEXT = body("text")
    .trim()
    .custom((val) => val.length < 300)
    .escape();

exports.VAL_COMMENT_UPVOTE = query("count")
    .custom((val) => {
        const numericVal = Math.abs(parseInt(val, 10));
        if (numericVal === 1) return true;
        throw new Error("Upvote must be 1 or -1");
    });