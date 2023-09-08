const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostModel = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  content: {
    text: { type: String, required: false },
    image: { data: Buffer, contentType: String, required: false },
    ref: { type: mongoose.Types.ObjectId, ref: "Post", required: false },
  },
  comments: { type: Set, of: mongoose.Types.ObjectId, ref: "Comment" },
  upVotes: { type: Number, default: 0 },
  time: { type: Date, required: true }
});
            
module.exports = mongoose.model("Post", PostModel);
