const async = require('async');
const mongo = require('mongodb');

const client = mongo.MongoClient;
const database = null;
const collection = null;

async.waterfall([
  cb => {
    client.connect('mongodb://localhost/mydb', cb);
  },
  (db, cb) => {
    database = db;
    collection = database.collection('people');
    collection.insert({name : 'Ann'}, cb);
  },
  (docs, cb) => {
    collection.find().toArray(cb);
  },
  (results, cb) => {
    console.log(results);
    database.close();
  }
], err => {
  if(err) {
    console.error('Error occured:', err);
  }
});
