const db = require("../../db");

module.exports = async (request, response) => {
  const {username, password, name, phone, cell, picture, email,
         address, city, state, country, birthday, company, nationality} = request.body;

  if (!username || !password || !email || !phone)
    return response.status(400).send("Invalid request.");

  let userId;

  try {
    userId = await db.registerUser(username, password, name, phone, cell, picture, email, address,
                                     city, state, country, birthday, company, nationality);
  } catch (error) {
    console.log(error.message);
    
    if (error.message === "Internal server error.") return response.status(500).send(error.message);
    
    return response.status(403).send(error.message);
  }

  return response.json({token: "AFakeToken", id: userId});
};