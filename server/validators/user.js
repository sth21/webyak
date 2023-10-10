const { body } = require("express-validator");
const User = require("../models/User");

const VALIDATE_EMAIL = body("email")
    .isEmail()
    .normalizeEmail();

const VALIDATE_EMAIL_UNIQUE = body("email")
    .custom(async (val) => {
        const user = await User.findOne({ email: val });
        if (user !== null) {
            throw new Error("Email already in use");
        }
        return true;
});

const VALIDATE_PASSWORD = body("password")
    .trim()
    .isAlphanumeric()
    .escape();

const VALIDATE_CONFIRM_PASSWORD = body("confirmPassword")
    .trim()
    .isAlphanumeric()
    .escape()
    .custom((val, { req }) => {
        if (val !== req.body.password) {
            throw new Error("Password does not match original entry");
        }
        return true;
    });

module.exports = { VALIDATE_EMAIL, VALIDATE_EMAIL_UNIQUE, VALIDATE_PASSWORD, VALIDATE_CONFIRM_PASSWORD };