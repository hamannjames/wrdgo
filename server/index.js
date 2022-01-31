const express = require('express');
const { default: fetch } = require('node-fetch');
const app = express();
const port = 3001;
const { words } = require('./static/words.js');
const path = require('path');

app.use(express.static(
  path.join(__dirname,'../client/build')));

app.get('/words', (req, res) => {
  res.json(words);
});

app.get('/word', (req, res) => {
  res.send(words[Math.floor(Math.random() * words.length)]);
});

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html")
  );
});

app.listen(port, () => {
  console.log('listening at port ' + port)
})