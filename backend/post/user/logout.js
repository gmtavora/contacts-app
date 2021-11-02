const db = require('../../db');

module.exports = async (request, response) => {
  const { id, token } = request.body;

  if (!id || !token) return response.status(400).send("Invalid request.");

  try {
    let storedToken = await db.getToken(id);
    
    if (token === storedToken) await db.deleteToken(id);
    else return response.status(403).send("Invalid credentials.");
  } catch (error) {
    console.log(error.message);

    return response.status(500).send("Internal server error.");
  }

  return response.status(200).send("You logged out.");
};