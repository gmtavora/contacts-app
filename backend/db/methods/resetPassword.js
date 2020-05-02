module.exports = function resetPassword(id) {
  const sql = `UPDATE Users
               SET password = ?
               WHERE id = ?`;
  
  return new Promise((resolve, reject) => {
    const newPassword = Math.random().toString(36).substr(2, 10);

    function callback(error) {
      if (error) return reject(new Error("Internal server error."));

      if (this.changes) resolve(newPassword);

      return reject(new Error("No such user."));
    }

    this.db.run(sql, [newPassword, id], callback);
  });
};