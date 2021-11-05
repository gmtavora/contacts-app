const db = require("../../db");

module.exports = async (request, response) => {
  const token = request.get("token");
  const id = request.get("id");

  if (!token) return response.status(403).send("You are not logged in.");
  if (!id || !request.file) return response.status(400).send("Invalid request.");

  const avatar = request.file.filename ? request.file.filename : "";

  try {
    const userInfo = await db.searchUserById(id);
    const storedToken = await db.getToken(id);

    if ((!userInfo) || (storedToken !== token)) return response.status(403).send("Invalid credentials.");

    await db.updateInformation(id, "avatar", avatar);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  const uri = request.file.filename ? ("http://192.168.1.68:8000/static/avatars/" + request.file.filename) : "";

  return response.status(200).json({ uri });
};