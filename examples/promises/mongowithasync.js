const mongo = require('mongodb');

const client = mongo.MongoClient;
let database = null;
let collection = null;

client
  .connect('mongodb://localhost/mydb')
  .then((db) => {
    database = db;
    collection = database.collection('people');
    return collection.insert({name : 'Ann'});
  })
  .then(docs => {
    return collection.find().toArray();
  })
  .then(results => {
    console.log(results);
    database.close();
  })
  .catch(err => {
    console.error('Error occurred:', err);
  });