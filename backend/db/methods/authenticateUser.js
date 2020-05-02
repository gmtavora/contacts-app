module.exports = function authenticateUser(username, password) {
  const sql = `SELECT * from Users WHERE username = ? AND password = ?;`;

  return new Promise((resolve, reject) => {
    const callback = (error, row) => {
      if (error) return reject(error);

      resolve(row);
    };

    this.db.get(sql, [...arguments], callback);
  });
};