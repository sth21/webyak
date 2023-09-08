const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserModel = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  comments: { type: Set, of: mongoose.Types.ObjectId, ref: "Comment" },
  posts: { type: Set, of: mongoose.Types.ObjectId, ref: "Post" },
  savedPosts: { type: Set, of: mongoose.Types.ObjectId, ref: "Savedpost" },
  upVotes: { type: Set, of: mongoose.Types.ObjectId, ref: "Post" },
  notifications: { type: [Object] },
  communities: { type: Map, of: Number },
});

module.exports = mongoose.model("User", UserModel);
