const db = require("../../db");

module.exports = async (request, response) => {
  const {token, id, name, phone, cell, email,
    address, city, state, country, birthday, company, nationality} = request.body;

  if (!token) return response.status(403).send("You are not logged in.");
  if (!id) return response.status(400).send("Invalid request.");

  try {
    const userSearch = await db.searchUserById(id);
    const userInfo = userSearch[0];
    const storedToken = await db.getToken(id);

    if ((!userInfo) || (storedToken !== token)) return response.status(403).send("Invalid credentials.");

    if ((name !== userInfo.name) && name) await db.updateInformation(id, "name", name);
    if ((phone !== userInfo.phone) && phone) await db.updateInformation(id, "phone", phone);
    if ((cell !== userInfo.cell) && cell) await db.updateInformation(id, "cell", cell);
    if ((email !== userInfo.email) && email) await db.updateInformation(id, "email", email);
    if ((address !== userInfo.address) && address) await db.updateInformation(id, "address", address);
    if ((city !== userInfo.city) && city) await db.updateInformation(id, "city", city);
    if ((state !== userInfo.state) && state) await db.updateInformation(id, "state", state);
    if ((country !== userInfo.country) && country) await db.updateInformation(id, "country", country);
    if ((birthday !== userInfo.birthday) && birthday) await db.updateInformation(id, "birthday", birthday);
    if ((company !== userInfo.company) && company) await db.updateInformation(id, "company", company);
    if ((nationality !== userInfo.nationality) && nationality) await db.updateInformation(id, "nationality", nationality);
  } catch(error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }

  return response.status(200).send("User updated successfully.");
};