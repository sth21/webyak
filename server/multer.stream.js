const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const { connection } = mongoose;

let gfs;

connection.once("open", () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection("photos");
});

module.exports = gfs;