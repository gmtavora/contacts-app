module.exports = function updateInformation(id, information, newValue) {
  let sql;

  switch(information) {
    case "name":
    case "phone":
    case "cell":
    case "email":
    case "address":
    case "city":
    case "state":
    case "country":
    case "birthday":
    case "company":
    case "nationality":
    case "avatar":
      sql = `UPDATE Users SET ${information} = ? WHERE id = ?;`;
      break;
    default:
      throw new Error("Invalid field.");
  }

  return new Promise((resolve, reject) => {
    function callback(error) {
      if (error) return reject(new Error("Internal server error."));
      resolve("Information updated successfully");
    }

    this.db.run(sql, [newValue, id], callback);
  });
};