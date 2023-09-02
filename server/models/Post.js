const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostModel = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  comments: { type: [ mongoose.Types.ObjectId ], ref: "Comment" },
  upVotes: { type: Number, default: 0 },
  time: { type: Date, required: true }
});
            
exports.default = mongoose.model("Post", PostModel);
