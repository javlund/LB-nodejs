const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.end('Hit the root.');
});

app.get('/secret', (req, res) => {
  res.end('Found the secret area!');
});

app.all('*', (req, res) => {
  res.writeHead(404);
  res.end('This page does not exist!');
});

app.listen(2345);
