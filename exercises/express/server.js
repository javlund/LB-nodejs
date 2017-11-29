const recipes = require('../http/recipes');
const express = require('express');
const bodyParser = require('body-parser');
const replacer = require('../http/replacer');
const app = express();

const port = 3456;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended : false
}));
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  //res.sendFile(__dirname + '/public/index.html');
  res.render('index');
});

app.get('/recipes', (req, res) => {
  /*replacer.insertIntoHtml(recipes.readRecipesAsText, 'public/recipes.html', merged => {
    res.end(merged);
  });*/
  recipes.readRecipesAsText((err, txt) => {
    res.render('recipes', {recipes : replacer.convertLineBreaksToHtml(txt.toString())});
  })
});

app.get('/create', (req, res) => {
  //res.sendFile(__dirname + '/public/create.html');
  res.render('create');
});

app.post('/create', (req, res) => {
  const recipe = req.body.opskrift;
  recipes.createRecipeWithText(replacer.cleanupPostedData(recipe), () => {
    res.redirect(303, '/recipes');
  });
});


app.listen(port, () => {
  console.log('Express lytter på port', port);
});
