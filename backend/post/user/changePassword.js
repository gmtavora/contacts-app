const db = require("../../db");
const bcrypt = require("bcrypt");

module.exports = async (request, response) => {
  const {token, id, newPassword, oldPassword} = request.body;

  if (!token || !id || !newPassword || !oldPassword)
    return response.status(400).send("Invalid request.");

  try {
    const userInfo = await db.searchUserById(id);
    if (!userInfo) return response.status(403).send("Invalid credentials");

    const storedToken = await db.getToken(id);
    if (storedToken !== token) return response.status(403).send("Invalid credentials");

    const passwordAuthentication = await bcrypt.compare(oldPassword, userInfo.password);
    if (!passwordAuthentication) return response.status(403).send("Incorrect password");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.changePassword(id, hashedPassword);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.status(200).send("Password changed successfully.");
};