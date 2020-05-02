const db = require("../../db");

module.exports = async (request, response) => {
  const {token, id} = request.body;

  if (!token) return response.status(403).send("You are not logged in.");
  if (!id) return response.status(400).send("Missing information");

  let contactsList = [];

  try {
    contactsList = await db.getFriendsList(id);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.json({contacts: contactsList});
};