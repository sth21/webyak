/* eslint-disable no-console */

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function initTestingDatabase() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri)
    .then(() => console.log("CONNECTED TO TESTING DB"))
    .catch(() => console.log("FAILED TO CONNECT TO TESTING DB"));
}

module.exports = initTestingDatabase;