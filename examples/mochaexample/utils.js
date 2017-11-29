const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello');
});

module.exports = {
  addThree : num => {
    return num + 3;
  },
  removeDecimals : num => {
    return parseInt(num);
  },
  startSimpleServer : () => {
    server.listen(6754);
  },
  stopSimpleServer : () => {
    server.close();
  }
};
