const db = require("../../db");

module.exports = async (request, response) => {
  const {token, id} = request.body;

  if (!id || !token) return response.status(400).send("Invalid request.");

  let contactsList = [];

  try {
    const storedToken = await db.getToken(id);
    if (storedToken !== token) return response.status(403).send("Invalid credentials");
    
    contactsList = await db.getFriendsList(id);
    contactsList = contactsList.map((e) => (
      {
        ...e,
        avatar: e.avatar ? e.avatar = `${process.env.HOST}:${process.env.PORT}/static/avatars/${e.avatar}` : null
      }
    ));
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.json({contacts: contactsList});
};