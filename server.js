const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');

app.use((req , res , next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log' , log + '\n' , (err) =>{
    if(err){
      console.log('Unable to append the server log.');
    }
  });
  next();
});

// app.use((req , res , next) => {
//   res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear' , () =>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt' , (text) => {
  return text.toUpperCase();
});


app.get('/' , (req , res) =>{
//  res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name : 'Pratham' ,
  //   likes : [
  //     'Biking' ,
  //     'Cycling'
  //   ]
  // });
  res.render('home.hbs' , {
    pageTitle : 'Home Page' ,
    welcomeText : 'Do your best'
  });
});

app.get('/about' , (req , res) => {
  res.render('about.hbs' , {
    pageTitle : 'About Page' ,
  });
});

app.get('/key=' , (req , res) => {
  res.send('Key is ');
});
// app.get('/help' , (req , res) => {
//   res.send('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Help Page</title></head><body><h1>Help Page</h1><p>Blah Blah Blah</p></body></html>');
// });

app.get('/bad' , (req , res) => {
  res.send({
    errorMessage : 'Error loading page'
  });
});


app.listen(port , () => {
  console.log('Server is up on port',port);
});
