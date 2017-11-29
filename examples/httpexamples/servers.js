const http = require('http');

const port1 = 3579;
const port2 = 4579;

const server1 = http.createServer((req, res) => {
  console.log('Got request on URL', req.url);

  res.writeHead(200);
  res.end('How do you do!');
});

const server2 = new http.Server();
server2.on('request', (req, res) => {
  console.log('Got request on URL', req.url);

  res.writeHead(200);
  res.end('How do you do!');
})

server1.listen(port1, () => {
  console.log('Listening on port', port1);
});

server2.listen(port2, () => {
  console.log('Listening on port', port2);
});
