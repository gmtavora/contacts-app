const db = require("../../db");
const bcrypt = require("bcrypt");

module.exports = async (request, response) => {
  const {username, password, name, phone, email, company} = request.body;

  if (!username || !password || !name || !phone || !email || !company)
    return response.status(400).send("Invalid request.");

  let userId, token;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    userId = await db.registerUser(username, hashedPassword, name, phone, email, company);
    token = await db.newToken(userId);
  } catch (error) {
    console.log(error.message);
    
    if (error.message === "Internal server error.") return response.status(500).send(error.message);
    
    return response.status(403).send(error.message);
  }

  const userInfo = {
    id: userId,
    token,
    username,
    name,
    phone,
    cell: "",
    email,
    address: "",
    city: "",
    state: "",
    country: "",
    birthday: "",
    company,
    nationality: ""
  };
  
  return response.json(userInfo);
};