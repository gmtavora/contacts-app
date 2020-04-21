const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./db/database.db", (error) => {
  if (error)
    return console.log(error.message);
});

db.get("SELECT name FROM sqlite_master WHERE type = \"table\" AND name = \"users\"", [], (error, row) => {
  if (error) return console.log(error.message);

  if (row) {
    return console.log("Database already exists.");
  }

  db.run(`CREATE TABLE users (
            username,
            password,
            name,
            phone,
            email,
            address,
            city,
            state,
            country,
            birthday,
            company,
            nationality);`);
});

db.close();