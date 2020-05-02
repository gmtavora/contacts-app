module.exports = function refuseFriendRequest(requested, id) {
  const sql = `UPDATE Friends
               SET status = 1, lastUserID = ?
               WHERE id = ?;`;
  
  return new Promise((resolve, reject) => {
    function callback(error) {
      if (error) return reject(error);

      console.log(`Refused ${this.changes} request.`);
      resolve();
    }

    this.db.run(sql, [requested, id], callback);
  });
};