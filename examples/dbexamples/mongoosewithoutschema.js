const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
mongoose.Promise = global.Promise;

const Person = mongoose.model('Person', {name : String});

const thomas = new Person({name : 'Thomas'});
thomas.save(err => {
  if(err) {
    console.error('Person was not saved - error:', err);
  } else {
    console.log('Person was saved with id', thomas.id);
  }
  mongoose.disconnect();
});
