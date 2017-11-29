const fs = require('fs');

const file = fs.createWriteStream('output.txt');

process.stdin.on('data', data => {
  file.write(data);
});

process.stdin.on('end', () => {
  file.end();
});

process.stdin.resume();
