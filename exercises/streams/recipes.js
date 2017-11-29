const fs = require('fs');
const filename = __dirname + '/recipes.txt';

module.exports = {
  createRecipe : (inputStream, cb) => {
    const outputStream = fs.createWriteStream(filename, {flags : 'a'});
    const ended = false;

    const end = () => {
      if(!ended) {
        ended = true;
        outputStream.write('\n');
        outputStream.end();
        cb();
      }
    }

    inputStream.on('data', data => {
      if(data != '\n') {
        outputStream.write(data);
      } else {
        end();
      }
    });

    inputStream.on('end', () => {
      end();
    });

  },
  createRecipeWithText : (txt, cb) => {
    const outputStream = fs.createWriteStream(filename, {flags : 'a'});
    outputStream.end(txt, cb);
  },
  readRecipes : outputStream => {
    const stream = fs.createReadStream(filename);
    stream.pipe(outputStream);
  },
  readRecipesAsText : cb => {
    fs.readFile(filename, cb);
  },
  clearRecipes : cb => {
    fs.truncate(filename, 0, cb);
  }
};
