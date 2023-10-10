const router = require("express").Router();
const passport = require("passport");

const { LOGIN, SIGNUP, DELETE_ACCOUNT } = require("../../controllers/authentication/authentication");
const { VALIDATE_EMAIL, VALIDATE_PASSWORD, VALIDATE_CONFIRM_PASSWORD, VALIDATE_EMAIL_UNIQUE } = require("../../validators/user");


router.post("/login", VALIDATE_EMAIL, VALIDATE_PASSWORD, LOGIN);

router.post("/signup", VALIDATE_EMAIL, VALIDATE_EMAIL_UNIQUE, VALIDATE_PASSWORD, VALIDATE_CONFIRM_PASSWORD, SIGNUP);

router.get("/delete-account", passport.authenticate("jwt", { session: false }), DELETE_ACCOUNT);

module.exports = router;