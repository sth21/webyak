const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommunitySchema = new Schema({
    name: { type: String, required: true },
    posts: { type: [mongoose.Types.ObjectId], ref: "Post", default: [] },
    members: { type: Number, default: 0 },
    emailDomain: { type: [String], required: false }
});

module.exports = mongoose.model("Community", CommunitySchema);