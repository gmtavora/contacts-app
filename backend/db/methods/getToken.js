module.exports = function getToken(id) {
  const sql = `SELECT * FROM Tokens WHERE userId = ? AND expiration > ?;`;
  
  const today = new Date();

  return new Promise((resolve, reject) => {
    function callback(error, row) {
      if (error) return reject(error);

      if (row) {
        return resolve(row.token);
      }

      return resolve(undefined);
    }

    this.db.get(sql, [id, today], callback);
  });
};