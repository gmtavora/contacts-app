const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./db/database.db", (error) => {
  if (error) {
    return console.error(error.message);
  }
});

const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());

app.post("/login", (request, response) => {
  const {username, password} = request.body;

  if (!username || !password)
    return response.status(400).send("Missing username or password.");

  db.get(`SELECT * from users WHERE username = ? AND password = ?`, [username, password], (error, row) => {
    if (error) console.log(error.message);
    if (!row) return response.status(403).send("Access denied.");
  });
  
  return response.json({token: "AFakeToken"});
});

app.post("/signup", (request, response) => {
  const {username, password, name,
          phone, email, address,
          city, state, country,
          birthday, company, nationality} = request.body;

  if (!username || !password)
    return response.status(400).send("Missing username or password.");
  
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`,
          [username, password, name, phone, email, address, city,
            state, country, birthday, company, nationality],
          function (error) {
            if (error) return console.log(error.message);
            console.log(`A row has been inserted with id: ${this.lastID}`);
          }
        );
});

app.use((request, response, next) => {
  const error = new Error("Not found.");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => response.status(error.status || 500).send(error.message || "There was a problem."));

const server = app.listen(PORT);
console.log(`Listening at ${PORT}`);