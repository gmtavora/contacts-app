const crypto = require("crypto");
const bcrypt = require("bcrypt");

module.exports = async function resetPassword(id) {
  const sql = `UPDATE Users
               SET password = ?
               WHERE id = ?`;

  const newPassword = crypto.randomBytes(12).toString('hex');
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  
  return new Promise((resolve, reject) => {
    function callback(error) {
      if (error) return reject(new Error("Internal server error."));

      if (this.changes) resolve(newPassword);

      return reject(new Error("No such user."));
    }

    this.db.run(sql, [hashedNewPassword, id], callback);
  });
};