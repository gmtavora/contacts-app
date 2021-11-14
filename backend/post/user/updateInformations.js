const db = require("../../db");

module.exports = async (request, response) => {
  const {token, id, name, phone, cell, email,
    address, city, state, country, birthday, company, nationality} = request.body;

  if (!token) return response.status(403).send("You are not logged in.");
  if (!id) return response.status(400).send("Invalid request.");

  let parsedBirthday = birthday ? `${birthday.substring(6, 10)}-${birthday.substring(3, 5)}-${birthday.substring(0, 2)}` : null;

  try {
    const userInfo = await db.searchUserById(id);
    const storedToken = await db.getToken(id);

    if ((!userInfo) || (storedToken !== token)) return response.status(403).send("Invalid credentials.");

    if ((name !== userInfo.name) && name) {await db.updateInformation(id, "name", name); userInfo.name = name;}
    if ((phone !== userInfo.phone) && phone) {await db.updateInformation(id, "phone", phone); userInfo.phone = phone;}
    if ((cell !== userInfo.cell) && cell) {await db.updateInformation(id, "cell", cell); userInfo.cell = cell;}
    if ((email !== userInfo.email) && email) {await db.updateInformation(id, "email", email); userInfo.email = email;}
    if ((address !== userInfo.address) && address) {await db.updateInformation(id, "address", address); userInfo.address = address;}
    if ((city !== userInfo.city) && city) {await db.updateInformation(id, "city", city); userInfo.city = city;}
    if ((state !== userInfo.state) && state) {await db.updateInformation(id, "state", state); userInfo.state = state;}
    if ((country !== userInfo.country) && country) {await db.updateInformation(id, "country", country); userInfo.country = country;}
    if ((parsedBirthday !== userInfo.birthday) && birthday) {await db.updateInformation(id, "birthday", birthday); userInfo.birthday = birthday}
    if ((company !== userInfo.company) && company) {await db.updateInformation(id, "company", company); userInfo.company = company;}
    if ((nationality !== userInfo.nationality) && nationality) {await db.updateInformation(id, "nationality", nationality); userInfo.nationality = nationality;}

    return response.status(200).send({...userInfo, password: null});
  } catch(error) {
    console.log(error.message);
    return response.status(500).send("Internal server error.");
  }
};