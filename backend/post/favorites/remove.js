const db = require("../../db");

module.exports = async (request, response) => {
  const {token, id, favorite} = request.body;

  if (!id || !token || !favorite) return response.status(400).send("Invalid request.");

  try {
    const storedToken = await db.getToken(id);
    if (storedToken !== token) return response.status(403).send("Invalid credentials.");
    
    await db.removeFavorite(id, favorite);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.status(204).send("Favorite removed.");
};