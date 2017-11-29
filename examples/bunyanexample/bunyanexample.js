const bunyan = require('bunyan');
const http = require('http');

const port = 9753;
const log = bunyan.createLogger({
  name : __filename,
  streams : [
    { level : 'info', stream : process.stdout},
    { level : 'error', path : 'error.log'}
  ]
});

http.createServer((req, res) => {
  log.info({url : req.url}, 'Nyt request på ' + req.url);

  if(req.url == '/secret') {
    log.error('Han har fundet ud af hemmeligheden!');
  }

  res.end('Tak for dit opkald!');
}).listen(port, () => console.log('Lytter på port', port));
