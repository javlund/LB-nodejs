const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();

const port = 8642;

app.use(bodyParser.urlencoded({
  extended : false
}));

app.use(session({
  keys : ['myKey']
}));

app.use((req, res, next) => {
  if(!req.session.user && req.method == 'GET' && req.url != '/login') {
    res.redirect('/login');
  } else {
    next();
  }
});

app.get(['/', '/login'], (req, res) => {
  res.sendFile(__dirname + '/html/login.html');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if(username.toLowerCase() == 'jacob' && password == 'node') {
    req.session.user = username;
    res.redirect('/secret');
  } else {
    res.redirect('back');
  }
});

app.get('/secret', (req, res) => {
    res.end('Velkommen til det hemmelige sted, ' + req.session.user);
});

app.use((req, res, next) => {
  res.status = 404;
  res.end('Kunne ikke finde siden.');
});

app.listen(port, () => {
  console.log('Lytter på port ' + port);
});
