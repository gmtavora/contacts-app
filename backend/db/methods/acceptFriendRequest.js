module.exports = function acceptFriendRequest(requested, id) {
  const sql = `UPDATE Friends
               SET status = 2, lastUserID = ?
               WHERE id = ?;`;

  return new Promise((resolve, reject) => {
    function callback(error) {
      if (error) return reject(error);

      console.log(`Accepted ${this.changes} request.`);
      resolve();
    }

    this.db.run(sql, [requested, id], callback);
  });
};