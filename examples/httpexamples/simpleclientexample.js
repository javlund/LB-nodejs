const http = require('http');

http.get('http://www.google.dk', res => {
  console.log('Got response: ' + res.statusCode);
  res.on('data', data => {
    console.log('Body:', data.toString());
  });
}).on('error', e => {
  console.log('Got error: ' + e.message);
});
