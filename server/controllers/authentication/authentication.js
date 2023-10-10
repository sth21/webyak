/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../../models/User");
const Community = require("../../models/Community");

exports.LOGIN = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        const { email, password } = req.body;

        // match user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ statusCode: 401, msg: "No account registered with provided email" });
        }

        // match password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ statusCode: 401, msg: "Incorrect password" });
        }

        // assign jwt
        const secret = fs.readFileSync(path.join(__dirname, "/../../cryptography/id_rsa_priv.pem"));

        const token = jwt.sign({ sub: user._id }, secret, { expiresIn: "1d", algorithm: "RS256" });

        return res.status(200).json({ statusCode: 200, msg: "Successfully logged in", token });
    }

    return res.status(500).json({ statusCode: 500, msg: "Unable to login", errors: result.array() });
});

exports.SIGNUP = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        // create user
        const { email, password } = req.body;

        const saltedPassword = bcrypt.hashSync(password, 16);

        const user = await User.create({ email, password: saltedPassword });

        // get their school
        const school = await Community.findOne({ emailDomain: email.substring(email.indexOf("@") + 1) });

        if (school) {
            user.communities.set(school._id, 0);
            await user.save();

            school.members += 1;
            await school.save();
        }

        // assign jwt
        const secret = fs.readFileSync(path.join(__dirname, "/../../cryptography/id_rsa_priv.pem"));

        const token = jwt.sign({ sub: user._id }, secret, { expiresIn: "1d", algorithm: "RS256" });

        return res.status(200).json({ statusCode: 200, msg: "Successfully signed up", token });
    }

    return res.status(500).json({ statusCode: 500, msg: "Unable to sign up", errors: result.array() });
});

exports.DELETE_ACCOUNT = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {

        // Decrement membership of communities user was in
        for await (const communityId of req.user.communities.keys()) {
            const community = await Community.findById(communityId);
            community.members -= 1;
            await community.save();
        }

        // remove user
        await User.deleteOne({ _id: req.user._id });

        res.status(200).json({ statusCode: 200, msg: "Successfully deleted account" });

    }

    return res.status(500).json({ statusCode: 500, msg: "Unable to delete account", errors: result.array() });
});