const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const client = new MongoClient(url);

const database = 'attendance';

const dbconnect = async () => {
  let result = await client.connect();
  return result.db(database);
};

module.exports = dbconnect;
