const { body } = require("express-validator");
const Post = require("../models/Post");

const text = body("text")
    .trim()
    .custom((val) => val.length < 300)
    .escape();

// image, ref
