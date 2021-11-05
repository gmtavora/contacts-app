const db = require("../../db");
const bcrypt = require("bcrypt");

module.exports = async (request, response) => {
  const {username, password} = request.body;

  if (!username || !password)
    return response.status(400).send("Missing username or password.");

  try {
    const userInfo = await db.searchUserByUsername(username);
    if (!userInfo) return response.status(403).send("Access denied.");

    const passwordAuthentication = await bcrypt.compare(password, userInfo.password);
    if (!passwordAuthentication) return response.status(403).send("Access denied.");

    const token = await db.newToken(userInfo.id);
    if (!token) return response.status(500).send("Internal server error.");

    delete userInfo.password;

    return response.json({token: token, ...userInfo, avatar: "http://192.168.1.68:8000/static/avatars/" + userInfo.avatar});
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }
};