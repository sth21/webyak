/* eslint-disable no-console */

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_KEY, { useNewUrlParser: true })
    .then(() => console.log("CONNECTED TO DB"))
    .catch(() => console.log("FAILED TO CONNECT TO DB"));

module.exports = mongoose.connection;