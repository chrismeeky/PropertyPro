var bar = 20;
var foo = bar;
const emeka = 25;

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('ci with travis');
});

const server = app.listen(3000, () => {
  console.log('App running on port 3000');
});

module.exports = server;