const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentModel = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
  content: { 
    text: { type: String, },
    photo: { data: Buffer, contentType: String, },
  },
  upVotes: { type: Number, default: 0 },
  time: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", CommentModel);
