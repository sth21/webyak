/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

async function connectDB() {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

async function disconnectDB() {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
}

async function disconnectCollections() {
  if (mongo) {
    const collections = await mongoose.connection.db.collections();
    for await (const collection of collections) {
      await collection.drop();
    }
  }
}

module.exports = { connectDB, disconnectDB, disconnectCollections }