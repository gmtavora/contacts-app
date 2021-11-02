const db = require("../../db");

module.exports = async (request, response) => {
  const {token, requester, requested} = request.body;

  if (!token || !requester || ! requested) return response.status(400).send("Invalid request.");

  try {
    const storedToken = await db.getToken(requester);
    if (storedToken !== token) return response.status(403).send("Invalid credentials.");
    
    await db.sendFriendRequest(requester, requested);
  } catch (error) {
    console.log(error.message);
    
    if (error.message.includes("SQLITE_CONSTRAINT"))
      return response.status(403).send("You already sent a request to this user.");
    
    return response.status(500).send("Internal server error.");
  }

  return response.status(201).send("Your request was sent.");
};