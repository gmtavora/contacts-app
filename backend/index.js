const express = require('express');
const bodyParser = require('body-parser');

const login = require('./post/login');
const signup = require('./post/signup');
const contacts = require('./post/contacts');
const contactsSearch = require('./post/contacts/search');
const request = require('./post/request');
const requestSend = require('./post/request/send');
const requestAccept = require('./post/request/accept');
const requestRefuse = require('./post/request/refuse');
const addFavorite = require('./post/favorites/add');
const removeFavorite = require('./post/favorites/remove');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());

app.get("/", (request, response) => {
  return response.send("Hello, word.");
});

app.post("/login", login);
app.post("/signup", signup);
app.post("/contacts", contacts);
app.post("/contacts/search", contactsSearch);
app.post("/request", request);
app.post("/request/send", requestSend);
app.post("/request/accept", requestAccept);
app.post("/request/refuse", requestRefuse);
app.post("/favorites/add", addFavorite);
app.post("/favorites/remove", removeFavorite);

app.use((request, response, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => response.status(error.status || 500).send(error.message || "There was a problem."));

app.listen(PORT);
console.log(`Listening on port ${PORT}`);