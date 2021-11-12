const db = require("../../db");

module.exports = async (request, response) => {
  const {id, token, word} = request.body;

  if (!id || !token || !word) return response.status(400).send("Invalid request.");

  let results = [];

  try {
    const storedToken = await db.getToken(id);
    if (token !== storedToken) return response.status(403).send("Invalid credentials.");
    
    results = await db.searchUserByName(id, word);
  } catch (error) {
    console.log(error.message);
    return request.status(500).send("Internal server error.");
  }

  return response.json({results});
};