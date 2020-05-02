const db = require("../../db");

module.exports = async (request, response) => {
  const {token, requested, id} = request.body;

  if (!token) return response.status(403).send("You are not logged in.");
  if (!requested || !id) return response.status(400).send("Missing information");

  try {
    await db.acceptFriendRequest(requested, id);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.status(201).send("You are now friends.");
};