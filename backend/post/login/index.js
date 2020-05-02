const db = require("../../db");

module.exports = async (request, response) => {
  const {username, password} = request.body;

  if (!username || !password)
    return response.status(400).send("Missing username or password.");

  try {
    const userInfo = await db.authenticateUser(username, password);

    if (userInfo) return response.json({token: "AFakeToken", id: userInfo.id});
    else return response.status(403).send("Access denied.");
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }
};