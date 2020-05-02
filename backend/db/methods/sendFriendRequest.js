module.exports = function sendFriendRequest(requester, requested) {
  const member1 = (requester < requested) ? requester : requested;
  const member2 = (requester < requested) ? requested : requester;

  const sql = `INSERT INTO Friends(member1, member2, status, lastUserID)
               VALUES (?, ?, 0, ?);`

  return new Promise((resolve, reject) => {
    function callback(error) {
      if (error) return reject(error);

      console.log(`Sent a new request with id: ${this.lastID}`);
      resolve();
    }

    this.db.run(sql, [member1, member2, requester], callback);
  });
};