const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserModel = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  comments: { type: [ mongoose.Types.ObjectId ], ref: "Comment" },
  posts: { type: [ mongoose.Types.ObjectId ], ref: "Post" },
  savedPosts: { type: [ mongoose.Types.ObjectId ], ref: "Savedpost" },
  upVotes: { type: [ mongoose.Types.ObjectId ], ref: "Upvote" },
  communities: { type: [ mongoose.Types.ObjectId ], ref: "Community" },
});

export default mongoose.model("User", UserModel);
