// https://www.npmjs.com/package/mailgun-js
const apiKey = 'key-04b36a4427313663805d22cbdfa89691';
var domain = 'playalong.io';
var mailgun = require('mailgun-js')({apiKey, domain});


const express = require('express');
var app = express();
var config = require('config');

app.get('/', function (req, res) {
  res.send('Welcome to playalong notifier...');
});


app.get('/childAdded/:chordId', function (req, res) {
  var chordId = req.params['chordId'];

  var data = {
    from: 'Playalong Notifier <contact@playalong.io>',
    to: 'contact@playalong.io',
    subject: `Chord Added - ${chordId}`,
    text: `https://playalong-prod.firebaseio.com/chords/${chordId}`,
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    res.send('Message sent!');
    console.log(`New Chord Added with Chord ID of ${chordId}`);

  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
