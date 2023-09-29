const mongoose = require("mongoose");
const Photo = require("./Photo");

const { Schema } = mongoose;

const PostModel = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  content: {
    text: { type: String, required: false },
    photo: { type: mongoose.Types.ObjectId, ref: Photo, required: false }
  },
  comments: { type: [mongoose.Types.ObjectId], ref: "Comment" },
  upVotes: { type: Number, default: 0 },
  time: { type: Date, required: true }
});
            
module.exports = mongoose.model("Post", PostModel);
