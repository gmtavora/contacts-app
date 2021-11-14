module.exports = function changePassword(id, newPassword) {
  const sqlCheckPassword = `SELECT password FROM Users WHERE id = ?`;
  const sqlChangePassword = `UPDATE Users
                             SET password = ?
                             WHERE id = ?;`;

  return new Promise((resolve, reject) => {
    function checkCallback(error, row) {
      if (error) return reject(new Error("Internal server error."));

      if (!row) return reject(new Error("No such user."));
    }

    function changeCallback(error) {
      if (error) return reject(new Error("Internal server error."));

      resolve("Password changed successfully.");
    }

    this.db.serialize(() => {
      this.db.get(sqlCheckPassword, [id], checkCallback)
             .run(sqlChangePassword, [newPassword, id], changeCallback);
    });
  });
};