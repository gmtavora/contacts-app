module.exports = function searchUserByName(id, word) {
  const sql = `SELECT * FROM Users WHERE name LIKE ? AND id != ?`;
  word = word + "%";

  return new Promise((resolve, reject) => {
    function callback(error, rows) {
      if (error) return reject(error);

      resolve(rows);
    }

    this.db.all(sql, [word, id], callback);
  });
};