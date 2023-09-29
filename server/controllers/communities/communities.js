const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Community = require("../../models/Community");

exports.COMMUNITY_ID = asyncHandler(async (req, res, next) => {
    const community = await Community.findById(req.params.communityid).populate().exec();
    req.community = community;
    next();
});

exports.GET_COMMUNITIES = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        const communities = await Community.find();
        return res.statusCode(200).json(communities.filter((community) => !community.emailDomain));
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to get communities"
    });
});

exports.JOIN_COMMUNITY = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        req.user.communities.set(req.params.communityid, 0);
        await req.user.save();
        return res.statusCode(200).json({
            statusCode: 200,
            msg: "Successfully joined community"
        });
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to join community"
    })
});

exports.LEAVE_COMMUNITY = asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (result.isEmpty()) {
        req.user.communities.delete(req.params.communityid);
        await req.user.save();
        return res.statusCode(200).json({
            statusCode: 200,
            msg: "Successfully left community"
        });
    }

    return res.statusCode(500).json({
        statusCode: 500,
        msg: "Unable to leave community"
    })
});