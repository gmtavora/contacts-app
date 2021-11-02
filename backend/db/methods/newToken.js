const crypto = require('crypto');

module.exports = function newToken(id) {
  const sqlDelete = `DELETE FROM Tokens WHERE userId = ?;`;
  const sqlCreate = `INSERT INTO Tokens (userId, token, expiration) VALUES (?, ?, ?);`;

  const today = new Date();

  let token = crypto.randomBytes(16).toString('hex');
  let expiration = new Date(today.getYear(), today.getMonth()+1, today.getDay());

  return new Promise((resolve, reject) => {
    function deleteCallback(error) {
      if (error) return reject(error);
    }

    function createCallback(error) {
      if (error) return reject(error);

      return resolve(token);
    }

    this.db.serialize(() => {
      this.db.run(sqlDelete, [id], deleteCallback)
      this.db.run(sqlCreate, [id, token, expiration.toString()], createCallback);
    });
  });
};