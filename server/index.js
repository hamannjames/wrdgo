const express = require('express');
const { default: fetch } = require('node-fetch');
const app = express();
const port = 3001;
const { words } = require('./static/words.js');

app.get('/words', (req, res) => {
  res.json(words);
});

app.get('/word', (req, res) => {
  res.send(words[Math.floor(Math.random() * words.length)]);
});

app.listen(port, () => {
  console.log('listening at port ' + port)
})