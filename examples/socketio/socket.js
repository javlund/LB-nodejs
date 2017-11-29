const socketio = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 3658;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', socket => {
  console.log('En bruger er logget på');
  socket.on('input', data => {
    console.log('Brugeren sendte beskeden ' + data.message);
    io.emit('output', {message : data.message.toUpperCase()});
  })
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
