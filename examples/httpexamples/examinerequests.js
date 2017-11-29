const http = require('http');

const port = 8765;

const server = http.createServer((req, res) => {
  console.log('URL requested: ', req.url);
  console.log('HTTP method:', req.method);
  console.log('Headers:');
  for(const header in req.headers) {
    const value = req.headers[header];
    console.log(header + ': ' + value);
  }
  req.on('data', data => {
    console.log('Data:', data.toString());
  });
  res.end();
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
