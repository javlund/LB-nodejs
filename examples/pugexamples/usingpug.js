const express = require('express');
const app = express();

const port = 4680;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/index', (req, res) => {
  res.render('index', {title: 'Velkommen', message: 'Hej!'});
});

app.get('/template', (req, res) => {
  res.render('templating');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}, access app on /index or /template`);
});
