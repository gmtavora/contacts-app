module.exports = function getFriendRequests(requested) {
  const sql = `SELECT Friends.id as requestID, Users.id, Users.name, Users.picture, Users.email, Users.company, lastUserID
               FROM Friends
               INNER JOIN Users
               ON CASE
                    WHEN (member1 = ?) THEN member2 = Users.id
                    WHEN (member2 = ?) THEN member1 = Users.id
                  END
               WHERE (status = 0);`;

  return new Promise ((resolve, reject) => {
    function callback(error, rows) {
      if (error) return reject(error);

      resolve(rows);
    }

    this.db.all(sql, [requested, requested], callback);
  });
};