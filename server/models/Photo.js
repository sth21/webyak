const mongoose = require("mongoose");

const { Schema } = mongoose;

const PhotoSchema = new Schema({
    chunkSize: { type: Number, required: true },
    uploadDate: { type: Date, required: true },
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    photoId: { type: mongoose.Types.ObjectId, required: true }
});

module.exports = mongoose.model("Photo", PhotoSchema);