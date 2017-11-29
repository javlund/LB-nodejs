const http = require('http');

const port = 7890;

const server = http.createServer((req, res) => {
  res.end('Hej fra node!');
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
