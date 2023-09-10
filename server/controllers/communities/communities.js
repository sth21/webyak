const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Community = require("../../models/Community");

exports.GET_COMMUNITIES = asyncHandler(async (req, res) => {
    const communities = await Community.find();
    return res.statusCode(200).json(communities.filter((community) => !community.emailDomain));
});

exports.JOIN_COMMUNITY = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.statusCode(403).json({
            statusCode: 403,
            msg: "Invalid permissions"
        })
    }

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
    if (!req.user) {
        return res.statusCode(403).json({
            statusCode: 403,
            msg: "Invalid permissions"
        })
    }

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