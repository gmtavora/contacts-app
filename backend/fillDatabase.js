const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const Database = require('./db/Database');
const dbSchema = require('./db/dbSchema');

const DB_PATH = "./db/database.db";

const db = new Database(DB_PATH, dbSchema);

const companies = [
  "Google",
  "Microsoft",
  "Openlane",
  "Yearin",
  "Goodsilron",
  "Condax",
  "Opentech",
  "Golddex",
  "year-job",
  "Isdom",
  "Gogozoom",
  "Y-corporation",
  "Nam-zim",
  "Donquadtech",
  "Warephase",
  "Donware",
  "Faxquote",
  "Sunnamplex",
  "Lexiqvolax",
  "Sumace",
  "Treequote",
  "Iselectrics"
];

async function handleUser(user, id) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("123mudar", salt);

  return {
    id: id,
    username: user.login.username,
    password: user.login.password,
    hashedPassword: hashedPassword,
    name: `${user.name.first} ${user.name.last}`,
    phone: user.phone,
    cell: user.cell,
    picture: user.picture.thumbnail,
    address: {
      street: `${user.location.street.name}, ${user.location.street.number}`,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country
    },
    email: user.email,
    birth: {
      date: user.dob.date.substring(0, 10),
      age: user.dob.age
    },
    company: randomCompany(),
    nat: user.nat,
  }
}

function randomCompany() {
  return companies[Math.floor(Math.random() * 20)];
}

async function fetchContacts(total) {
  const request = await fetch(`https://randomuser.me/api/?nat=br&results=${total}`);
  const { results } = await request.json();

  let id = 0;

  const formatted = results.map(async function (user) {
      return await handleUser(user, id++);
    }).sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
  });

  formatted.forEach(async (user) => {
    try {
          const idReceived = await db.registerUser(user.username, user.hashedPassword, user.name, user.phone, user.email, user.company);
          await db.updateInformation(idReceived, "cell", user.cell);
          await db.updateInformation(idReceived, "address", user.address.street);
          await db.updateInformation(idReceived, "city", user.address.city);
          await db.updateInformation(idReceived, "state", user.address.state);
          await db.updateInformation(idReceived, "country", user.address.country);
          await db.updateInformation(idReceived, "birthday", user.birth.date);
          await db.updateInformation(idReceived, "nationality", user.nat);
          await db.updateInformation(idReceived, "avatar", user.picture);

          console.log(`Inserted new user with name: ${user.name} and password ${user.password}`);
        } catch (error) {
          console.log(error.message);
          return;
        }
  });
}

fetchContacts(10);