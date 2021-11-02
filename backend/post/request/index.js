const db = require("../../db");

module.exports = async (request, response) => {
  const {token, requested} = request.body;

  if (!token || !requested) return response.status(400).send("Invalid request.");

  let requestsList = [];

  try {
    const storedToken = await db.getToken(requested);
    if (token !== storedToken) return response.status(403).send("Invalid credentials.");

    requestsList = await db.getFriendRequests(requested);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.json({requests: requestsList});
};