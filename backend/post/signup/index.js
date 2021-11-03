const db = require("../../db");
const bcrypt = require("bcrypt");

module.exports = async (request, response) => {
  const {username, password, name, phone, cell, email,
         address, city, state, country, birthday, company, nationality} = request.body;

  if (!username || !password || !email || !phone)
    return response.status(400).send("Invalid request.");

  let userId, token;
  let parsedBirthday = birthday.substring(6, 10) + "-" + birthday.substring(3, 5) + "-" + birthday.substring(0, 2);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    userId = await db.registerUser(username, hashedPassword, name, phone, cell, email, address,
                                     city, state, country, parsedBirthday, company, nationality);
    token = await db.newToken(userId);
  } catch (error) {
    console.log(error.message);
    
    if (error.message === "Internal server error.") return response.status(500).send(error.message);
    
    return response.status(403).send(error.message);
  }
  
  return response.json({token: token, id: userId});
};