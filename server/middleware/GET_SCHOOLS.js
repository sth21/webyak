const asyncHandler = require("express-async-handler");
const Community = require("../models/Community");

module.exports = asyncHandler(async (req, res, next) => {
    const communities = await Community.find();
    req.schools = communities.filter((community) => !!community.emailDomain);
    next();
});