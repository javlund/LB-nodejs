const assert = require('assert');

describe('Recipes', () => {
  const recipes = require('../http/recipes.js');
  describe('#createRecipe', () => {
    it('should create a recipe in a file', done => {
      const data = 'Tomat og agurk';
      recipes.readRecipesAsText((err, text) => {
        const currentLength = text.length;
        recipes.createRecipeWithText(data, () => {
          recipes.readRecipesAsText((err, text) => {
            const newLength = text.length;
            assert.equal(newLength, currentLength + data.length);
            done();
          });
        });
      });
    });
  });
});

describe('Server', function() {
  require('./server');
  const http = require('http');
  const recipe = require('./recipe');
  describe('#/create', function() {
    it('should create a recipe in the database', function(done) {
      const postData = 'name=Salat&ingredients=Salat&instructions=Skyl+salaten&preptime=2';
      const options = {
        hostname : 'localhost',
        path : '/create',
        method : 'POST',
        port : 3456,
        headers : {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };
      const req = http.request(options, function(res) {
        const saladQuery = recipe.Recipe.find({name : 'Salat'});
        saladQuery.exec(function(err, recipes) {
          assert(recipes.length >= 1);
          saladQuery.remove(done);
        });
      });
      req.write(postData);
      req.end();
    });
  });
});
