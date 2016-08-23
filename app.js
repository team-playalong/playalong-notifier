const config = require('config');
const express = require('express');
const cors = require('cors');

// https://www.npmjs.com/package/mailgun-js
const apiKey = config.get('mailgun.api');
const domain = config.get('mailgun.domain');
const mailgun = require('mailgun-js')({apiKey, domain});

const app = express();
app.use(cors());

app.get('/', function (req, res) {
  res.send('Welcome to playalong notifier...');
});

app.get('/login/:uid/:displayName/:email', (req, res) => {
  const uid = req.params['uid'];
  const displayName = req.params['displayName'];
  const email = req.params['email'];


  const data = {
    from: 'Playalong Notifier <contact@playalong.io>',
    to: 'contact@playalong.io',
    subject: `User Logged in - ${uid}`,
    text: `${displayName} has logged in!. Email ${email}`,
  };

  mailgun.messages()
  .send(data, (error, body) => {
    console.log(body);
    res.send('Message sent!');
  });
});

app.get('/childAdded/:chordId', (req, res) => {
  const chordId = req.params['chordId'];

  const data = {
    from: 'Playalong Notifier <contact@playalong.io>',
    to: 'contact@playalong.io',
    subject: `Chord Added - ${chordId}`,
    text: `https://playalong-prod.firebaseio.com/chords/${chordId}`,
  };

  mailgun.messages()
  .send(data, (error, body) => {
    console.log(body);
    res.send('Message sent!');
    console.log(`New Chord Added with Chord ID of ${chordId}`);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Example app listening on port 3000!');
});
