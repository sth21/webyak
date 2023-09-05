const router = require("express").Router;

const { LOGIN, SIGNUP, LOGOUT, DELETE_ACCOUNT } = require("../../controllers/authentication/authentication");

router.post("/login", LOGIN);

router.post("/signup", SIGNUP);

router.get("/logout", LOGOUT);

router.get("/delete-account", DELETE_ACCOUNT);

exports.default = router;