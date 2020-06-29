const { MongoClient } = require("mongodb");
const { config } = require("../config");

let MONGO_URI = "";
if (config.dev) {
  MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}`;
} else {
  MONGO_URI = `mongodb://${config.dbUser}:${config.dbPass}@${config.dbHost}:${config.dbPort}/?authSource=${config.dbName}`;
}

const DB_NAME = config.dbName;
console.log(config);
console.log(MONGO_URI)

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  async connect() {
    try {
        await this.client.connect()
        console.log("Connected to mongo");
        return this.client.db(this.dbName)
    } catch (e) {
        console.error(e)
    }
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
    const db = await this.connect()
    return await db.collection(collection).find(query).toArray();
    // return this.connect().then((db) => {
    //   return db.collection(collection).find(query).toArray();
    // });
  }
}

module.exports = MongoLib;
