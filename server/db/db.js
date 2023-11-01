require('dotenv').config();
const dbUrl = process.env.ATLAS_URI;
const MongoClient = require('mongodb').MongoClient;
let instance = null;

class DB {
  constructor(){
    //instance is the singleton, defined in outer scope
    if (!instance){
      instance = this;
      this.client = new MongoClient(dbUrl);
      this.db = null;
      this.collection = null;
    }
    return instance;
  }

  async connect(dbname, collName) {
    if (instance.db){
      return;
    }
    try{
      await instance.client.connect();
      instance.db = await instance.client.db(dbname);
      // Send a ping to confirm a successful connection
      await instance.client.db(dbname).command({ ping: 1 });
      console.log('Successfully connected to MongoDB database ' + dbname);
      instance.collection = await instance.db.collection(collName);
    } catch{
      await instance.close();
    }
  }
  async create() {
    // if(!isMany) {
    //   return await instance.collection.insertOne(quote);
    // }
    // return await instance.collection.insertMany(quote);
  }
  
  async readAll() {
    return await instance.collection.find().toArray();
  }

  async close() {
    await instance.client.close();
    instance = null;
  }
}
module.exports = DB;