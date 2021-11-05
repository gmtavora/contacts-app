const fetch = require('node-fetch');
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

function handleUser(user, id) {
  return {
    id: id,
    username: user.login.username,
    password: user.login.password,
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
      date: user.dob.date,
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

  const formatted = await results.map((user) => handleUser(user, id++)).sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  formatted.forEach(async (user) => {
    try {
          const idReceived = await db.registerUser(user.username, user.password, user.name, user.phone, user.cell, user.email, user.address.street, user.address.city, user.address.state, user.address.country, user.birth.date, user.company, user.nat);
          await db.updateInformation(idReceived, "avatar", user.picture);

          console.log(`Inserted new user with name: ${user.name}`);
        } catch (error) {
          console.log(error.message);
          return;
        }
  });
}

fetchContacts(10);