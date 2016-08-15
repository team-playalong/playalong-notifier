const express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var config = require('config');
const cors = require('cors')

const username = config.get('email.username');
const password = config.get('email.password');

app.use(cors());

app.get('/', function (req, res) {
  res.send('Welcome to playalong notifier...');
});


app.get('/childAdded/:chordId', function (req, res) {
  var chordId = req.params['chordId'];

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(`smtps://${username}%40gmail.com:${password}@smtp.gmail.com`);


  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Dadi Atar" <atardadi@gmail.com>', // sender address
    to: 'atardadi@gmail.com', // list of receivers (comma separated)
    subject: 'New Chord Added', // Subject line
    text: `New Chord Added with Chord ID of ${chordId}`, // plaintext body
    // html: '<b>Hello world 🐴</b>' // html body
  };


	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
    console.log(`New Chord Added with Chord ID of ${chordId}`);
		res.send('Message sent: ' + info.response);
	});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
