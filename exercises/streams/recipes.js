const fs = require('fs');
const filename = __dirname + '/recipes.txt';

module.exports = {
  createRecipe : (inputStream, callback) => {
    const outputStream = fs.createWriteStream(filename, {flags : 'a'});

    const end = () => {
      outputStream.write('\n');
      outputStream.end();
      callback();
    }

    inputStream.on('data', data => {
      if(data != '\n') {
        outputStream.write(data);
        return;
      }
      end();
    });
  },
  readRecipes : outputStream => {
    const stream = fs.createReadStream(filename);
    stream.pipe(outputStream);
  },
  clearRecipes : callback => {
    fs.truncate(filename, 0, callback);
  }
};
