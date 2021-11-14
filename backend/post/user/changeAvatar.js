const db = require("../../db");

module.exports = async (request, response) => {
  const token = request.get("token");
  const id = request.get("id");

  if (!token || !id) return response.status(403).send("You are not logged in.");

  const avatar = request.file ? request.file.filename : null;

  try {
    const userInfo = await db.searchUserById(id);
    const storedToken = await db.getToken(id);

    if ((!userInfo) || (storedToken !== token)) return response.status(403).send("Invalid credentials.");

    await db.updateInformation(id, "avatar", avatar);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  const uri = request.file ? (`${process.env.HOST}:${process.env.PORT}/static/avatars/` + request.file.filename) : null;

  return response.status(200).json({ uri });
};