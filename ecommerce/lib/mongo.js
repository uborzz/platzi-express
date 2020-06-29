const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config");

let MONGO_URI = "";
if (config.dev) {
  MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}`;
} else {
  MONGO_URI = `mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/?authSource=${config.dbName}`;
}

const DB_NAME = config.dbName;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  async connect() {
    // try {
    await this.client.connect();
    console.log("Connected to mongo");
    return this.client.db(this.dbName);
    // } catch (e) {
    //   console.error("ERROR!", e);
    // }

    // return new Promise((resolve, reject) => {
    //   this.client.connect((error) => {
    //     if (error) {
    //       reject(error);
    //     }
    //     console.log("Connected to mongo");
    //     resolve(this.client.db(this.dbName));
    //   });
    // });
  }

  async getAll(collection, query) {
    // try {
    const db = await this.connect();
    return await db.collection(collection).find(query).toArray();
    // } catch (e) {
    //   console.error("ERROR!", e);
    // }

    // return this.connect().then((db) => {
    //   return db.collection(collection).find(query).toArray();
    // });
  }

  async get(collection, id) {
    const db = await this.connect();
    return await db.collection(collection).findOne({ _id: ObjectId(id) });
  }

  async create(collection, data) {
    const db = await this.connect();
    const created = await db.collection(collection).insertOne(data);
    return created.insertedId;
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return result.upsertedId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    const result = await db
      .collection(collection)
      .deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount) {
      return id;
    } 
  }
}

module.exports = MongoLib;
