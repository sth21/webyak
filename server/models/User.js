import mongoose, { Schema } from "mongoose";

const UserModel = new Schema({
  email: { type: String, required: true },
  comments: { type: [ mongoose.Types.ObjectId ] },
});

export default mongoose.model("User", UserModel);
