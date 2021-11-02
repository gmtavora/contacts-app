module.exports = function searchUserById(id) {
  const sql = `SELECT * FROM Users WHERE id = ?`;

  return new Promise((resolve, reject) => {
    function callback(error, rows) {
      if (error) return reject(error);

      resolve(rows);
    }

    this.db.all(sql, [id], callback);
  });
};