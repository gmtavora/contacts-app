module.exports = function addFavorite(user, favorite) {
  let sql;

  if (user < favorite) sql = `UPDATE Friends
                              SET isFavoriteOf1 = TRUE
                              WHERE member1 = ? AND member2 = ?`;
  else sql = `UPDATE Friends
              SET isFavoriteOf2 = TRUE
              WHERE member2 = ? AND member1 = ?`;
  
  return new Promise((resolve, reject) => {
    function callback(error) {
      if (error) return reject(new Error("Internal server error."));
      resolve();
    }

    this.db.run(sql, [user, favorite], callback);
  });
};