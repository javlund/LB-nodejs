const http = require('http');
const iconvlite = require('iconv-lite');

const options = {
  hostname : 'www.wikipedia.dk',
  port : 80,
  method : 'GET',
  //path : eventuel sti
  headers : {
    // eventuelle headers
  }
};

const req = http.request(options, res => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers));

  res.on('data', data => {
    console.log('Body', iconvlite.decode(data, 'iso-8859-1'));
  });
});

req.on('error', e => {
  console.error('Noget gik galt!', e.message);
});

req.end();
