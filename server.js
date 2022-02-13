const request = require('request');
const express = require("express");
const app = express();

const PORT = 3080;

let userArray = [];

let quotes = [];

request('https://randomuser.me/api/?results=10', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  const users = body.results.map( user => {
      const newUser = {
          'name': { 'first': user.name.first, 'last' : user.name.last},
          'img': user.picture.thumbnail
      }
      return newUser;
  })
  userArray = users;
});

request('https://type.fit/api/quotes', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  quotes = body;
});


app.get('/persons', (req, res) => {
    res.send(userArray);
})

app.get('/quotes', (req, res) => {
    res.send(quotes);
})

app.listen(PORT, () => {
    console.log(`Server listens on port ${PORT}`);
});
