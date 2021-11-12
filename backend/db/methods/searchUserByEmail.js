module.exports = function searchUserByEmail(email) {
  const sql = `SELECT * FROM Users WHERE email = ?;`;

  return new Promise((resolve, reject) => {
    function callback(error, row) {
      if (error) return reject(error);

      resolve(row);
    }

    this.db.get(sql, [email], callback);
  });
};