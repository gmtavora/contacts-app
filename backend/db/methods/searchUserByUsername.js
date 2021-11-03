module.exports = function searchUserByUsername(username) {
  const sql = `SELECT * FROM Users WHERE username = ?;`;

  return new Promise((resolve, reject) => {
    function callback(error, row) {
      if (error) return reject(error);

      resolve(row);
    }

    this.db.get(sql, [username], callback);
  });
}