const express = require('express');
const bodyParser = require('body-parser');
const replacer = require('../http/replacer');
const socketio = require('socket.io');
const http = require('http');
const recipe = require('./recipe');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

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
  recipe.Recipe.find((err, recipes) => {
    res.render('recipes', {recipes : recipes});
  });
});

app.get('/create', (req, res) => {
  const message = req.query.message;
  res.render('create', {message : message});
});

app.post('/create', (req, res) => {
  const recipeData = req.body;

  const newRecipe = new recipe.Recipe({
    name : recipeData.name,
    ingredients : recipeData.ingredients,
    instructions : recipeData.instructions,
    prepTime : recipeData.preptime
  });

  newRecipe.save((err, savedRecipe) => {
    if(err) {
      console.error(err);
      res.redirect('/create?message=' + err.message);
      return;
    }
    io.emit('newrecipes', savedRecipe);
    res.redirect(303, '/recipes');
  });

});

server.listen(port, () => {
  console.log(`Express lytter på port ${port}`);
});

module.exports.server = server;
