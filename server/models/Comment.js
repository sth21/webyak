const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentModel = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  upVotes: { type: Number, default: 0 },
  time: { type: Date, required: true },
});

exports.default = mongoose.model("Comment", CommentModel);
