const db = require("../../db");

module.exports = async (request, response) => {
  const {token, word} = request.body;

  if (!token) return response.status(403).send("You are not logged in.");
  if (!word) return response.status(400).send("Missing information");

  let results = [];

  try {
    results = await db.searchUserByName(word);
  } catch (error) {
    console.log(error.message);
    return request.status(500).send("Internal server error.");
  }

  return response.json({results});
};