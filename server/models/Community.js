const mongoose = require("mongoose");

const {Schema} = mongoose;

const CommunitySchema = new Schema({
    name: { type: String, required: true },
    posts: { type: [ mongoose.Types.ObjectId ], ref: "Post" },
    isSchool: { type: Boolean, required: true }
});

export default mongoose.model("Community", CommunitySchema);