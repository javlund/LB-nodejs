const http = require('http');
const fs = require('fs');
const recipes = require('../streams/recipes');
const replacer = require('./replacer');

const port = 5678;

const server = http.createServer((req, res) => {
  switch(req.url) {
    case '/':
    case '/index':
      const index = fs.createReadStream('html/index.html');
      index.pipe(res);
      break;
    case '/recipes':
      replacer.insertIntoHtml(recipes.readRecipesAsText, 'html/recipes.html', merged => {
        res.end(merged);
      });
      break;
    case '/create':
      if(req.method == 'GET') {
        const create = fs.createReadStream('html/create.html');
        create.pipe(res);
      } else if (req.method == 'POST') {
        req.on('data', data => {
          const recipe = /opskrift=(.*)/.exec(data.toString())[1];
          recipes.createRecipeWithText(replacer.cleanupPostedData(recipe), () => {
            res.writeHead(303, {
              'Location' : '/recipes'
            });
            res.end();
          });
        });
      }
      break;
    default:
      res.writeHead(404);
      res.end('Siden ikke fundet.');
  }
});

server.listen(port, () => {
  console.log(`Serveren er klar på port ${port}`);
});
