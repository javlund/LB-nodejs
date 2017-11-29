const fs = require('fs');

const file = fs.createWriteStream('output.txt');

process.stdin.pipe(file);

process.stdin.resume();
