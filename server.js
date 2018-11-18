const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) console.log(err);
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: "Home, home again",
    currentYear: new Date().getFullYear(),
    welcomeMessage: "Hello goodbye",
  })
});

app.get('/me', (req, res) => {
  res.send({
    name: "Marcio",
    likes: [
      "Flávia",
      "Books",
      "Comics",
      "Movies",
      "Codes",
      "Reap"
    ]
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "About Me",
    currentYear: new Date().getFullYear(),
  });
});

app.get('/project', (req, res) => {
  res.render('project.hbs',{
    pageTitle: 'Projects',
    body:"You say yes, and I say no",
  });
});

app.get('/help', () => {

});

app.get('/error', (req, res) => {
  res.send({
    error: 'bad request',
    code: 400,
  })
});

app.listen(port, () => {
  console.log(`Connected with port ${port}`);
});
