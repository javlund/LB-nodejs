const mongo = require('mongodb');

const client = mongo.MongoClient;

client.connect('mongodb://localhost/mydb', (err, db) => {
  if(err) {
    console.error('Error occured:', err);
    return;
  }
  const collection = db.collection('people');
  collection.insert({name : 'Ann'}, (err, docs) => {
    collection.find().toArray((err, results) => {
      console.log(results);
      db.close();
    });
  });
});
