module.exports = function searchUserById(id) {
  const sql = `SELECT * FROM Users WHERE id = ?`;

  return new Promise((resolve, reject) => {
    function callback(error, row) {
      if (error) return reject(error);

      resolve(row);
    }

    this.db.get(sql, [id], callback);
  });
};