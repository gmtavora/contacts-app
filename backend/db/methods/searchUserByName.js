module.exports = function searchUserByName(word) {
  const sql = `SELECT * FROM Users WHERE name LIKE ?`;
  word = word + "%";

  return new Promise((resolve, reject) => {
    function callback(error, rows) {
      if (error) return reject(error);

      resolve(rows);
    }

    this.db.all(sql, [word], callback);
  });
};