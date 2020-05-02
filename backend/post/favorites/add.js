const db = require("../../db");

module.exports = async (request, response) => {
  const {token, id, favorite} = request.body;

  if (!token) return response.status(403).send("You are not logged in.");
  if (!id || !favorite) return response.status(400).send("Missing information");

  try {
    await db.addFavorite(id, favorite);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.status(204).send("Favorite added.");
};