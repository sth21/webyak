const router = require("express").Router();
const passport = require("passport");

const { LOGIN, SIGNUP, DELETE_ACCOUNT } = require("../../controllers/authentication/authentication");

router.post("/login", LOGIN);

router.post("/signup", SIGNUP);

router.get("/delete-account", passport.authenticate("jwt"), DELETE_ACCOUNT);

exports.default = router;