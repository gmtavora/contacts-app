module.exports = function registerUser(username, password, name, phone, cell, picture, email, address, city, state, country, birthday, company, nationality) { 
  const sql = `INSERT INTO Users (username, password, name, phone, cell, picture, email, address, city, state, country, birthday, company, nationality)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  return new Promise((resolve, reject) => {
    const usernameCheckCallback = (error, row) => {
      if (error) return reject(new Error("Internal server error."));
      if (row) return reject(new Error("Username already exists."));
    };

    const emailCheckCallback = (error, row) => {
      if (error) return reject(new Error("Internal server error."));
      if (row) return reject(new Error("Email already in use."));
    };

    function insertCallback(error) {
      if (error) return reject(new Error("Internal server error."));

      console.log(`A row has been inserted with id: ${this.lastID}`);
      resolve(this.lastID);
    }

    this.db.serialize(() => {
      this.db.get(`SELECT * FROM Users WHERE username = ?;`, [username], usernameCheckCallback)
             .get(`SELECT * FROM Users WHERE email = ?;`, [email], emailCheckCallback)
             .run(sql, [...arguments], insertCallback);
    });
  });
};