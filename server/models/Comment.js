const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentModel = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  content: { 
    text: { type: String },
    image: { data: Buffer, contentType: String },
  },
  upVotes: { type: Number, default: 0 },
  time: { type: Date, required: true },
});

module.exports = mongoose.model("Comment", CommentModel);
