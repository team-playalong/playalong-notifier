var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var config = require('config');


// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport('smtps://atardadi%40gmail.com:pass@smtp.gmail.com');
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address 
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers 
    subject: 'Hello ✔', // Subject line 
    text: 'Hello world 🐴', // plaintext body 
    html: '<b>Hello world 🐴</b>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);



app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});