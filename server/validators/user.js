const { body } = require("express-validator");
const User = require("../models/User");

const email = body("email")
    .isEmail()
    .normalizeEmail()
    .custom(async (val) => {
        const user = User.findOne({ email: val });
        if (user) {
            throw new Error("Password already in use");
        }
        return true;
    });

const password = body("password")
    .trim()
    .isAlphanumeric()
    .escape();

const confirmPassword = body("confirmPassword")
    .trim()
    .isAlphanumeric()
    .escape()
    .custom((val, { req }) => {
        if (val !== req.body.password) {
            throw new Error("Password does not match original entry");
        }
    });

module.exports = [email, password, confirmPassword];