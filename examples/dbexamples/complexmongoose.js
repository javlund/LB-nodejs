const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const carSchema = new Schema({
  brand : String,
  name : {type : String, required : 'Bilen skal have et navn'},
  kmph : Number,
  mileage : Number,
  fourWheelDrive : Boolean
});

// Mongoose har det ikke godt med arrow functions, da findSimilar har brug for at bruge this.
carSchema.methods.findSimilar = function(cb) {
  return this.model('Car').find({brand : this.brand}, cb);
};

const Car = mongoose.model('Car', carSchema);

Car.schema.path('brand').validate(function(value) {
  return /Honda|Audi|BMW|Mercedes|Mazda|Trabant/.test(value);
}, 'Forkert mærke');

const honda = new Car({
  brand : 'Honda',
  name : 'Jazz',
  kmph : 200,
  fourWheelDrive : false
});

console.log('Id:', honda.id);

honda.save((err, honda) => {
  if(err) {
    console.error(err);
    mongoose.disconnect();
  } else {
    console.log('Nyt id: ', honda.id);
    honda.findSimilar((err, cars) => {
      console.log(cars);
      mongoose.disconnect();
    });
  }

});
