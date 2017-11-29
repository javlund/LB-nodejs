const express = require('express');
const bodyParser = require('body-parser');
const replacer = require('../http/replacer');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipes');

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

const app = express();

const port = 3456;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended : false
}));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/recipes', (req, res) => {
  Recipe.find((err, recipes) => {
    res.render('recipes', {recipes : recipes});
  });
});

app.get('/create', (req, res) => {
  const message = req.query.message;
  res.render('create', {message : message});
});

app.post('/create', (req, res) => {
  const recipeData = req.body;

  const recipe = new Recipe({
    name : recipeData.name,
    ingredients : recipeData.ingredients,
    instructions : recipeData.instructions,
    prepTime : recipeData.preptime
  });

  recipe.save((err, recipe) => {
    if(err) {
      console.error(err);
      res.redirect('/create?message=' + err.message);
    } else {
      res.redirect(303, '/recipes');
    }
  });

});


app.listen(port, () => {
  console.log('Express lytter på port', port);
});
