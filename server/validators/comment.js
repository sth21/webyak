const { body } = require("express-validator");

const text = body("text")
    .trim()
    .custom((val) => val.length < 300)
    .escape();

exports.default = text;