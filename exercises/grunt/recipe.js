const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipes');
mongoose.Promise = global.Promise;

const recipeSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  ingredients : String,
  instructions : String,
  prepTime : Number
});

const Recipe = mongoose.model('Recipe', recipeSchema);

recipeSchema.path('prepTime').validate(value => {
  return !/[^0-9]/.test(value);
});

module.exports.Recipe = Recipe;
