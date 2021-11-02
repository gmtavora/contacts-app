module.exports = function deleteToken(id) {
  const sql = `DELETE FROM Tokens WHERE userId = ?;`;

  return new Promise((resolve, reject) => {
    function callback(error) {
      if (error) return reject(error);

      return resolve();
    }

    this.db.run(sql, [id], callback);
  });
}