module.exports = function getFriendsList(id) {
  const sql = `SELECT Users.*, status, CASE WHEN member1 = ? THEN isFavoriteOf1 ELSE isFavoriteOf2 END AS favorite FROM Friends
               INNER JOIN Users
               ON CASE
                    WHEN (member1 = ? AND status = 2) THEN member2 = Users.id
                    WHEN (member2 = ? AND status = 2) THEN member1 = Users.id
                  END;`;
  
  return new Promise((resolve, reject) => {
    const callback = (error, rows) => {
      if (error) return reject(error);

      resolve(rows.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        else return 0;
      }));
    };

    this.db.all(sql, [id, id, id], callback);
  })
};