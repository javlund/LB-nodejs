const cluster = require('cluster');
const http = require('http');
const os = require('os');

const port = 9876;
const numCpus = os.cpus().length;

if(cluster.isMaster) {
  for(let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    cluster.fork();
  });
  return;
}
http.createServer((req, res) => {
  const id = cluster.worker.id;
  console.log(`Request for ${req.url} on process ${id}`);
  res.writeHead(200);
  res.end(`Hello from ${id}`);
}).listen(port, () => console.log(`Process ${cluster.worker.id} (${numCpus} processes all in all) is listening on port ${port}.`));
