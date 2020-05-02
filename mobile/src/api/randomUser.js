const NUMBER_OF_CONTACTS = 10;

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
]

function handleUser(user, id) {
  return {
    id: id,
    name: `${user.name.first} ${user.name.last}`,
    phone: user.phone,
    cell: user.cell,
    picture: user.picture,
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
    favorite: Math.round(Math.random())
  };
}

function randomCompany() {
  return companies[Math.floor(Math.random() * 20)];
}

function splitArray(array) {
  return array.reduce((acc, cur) => {
    let firstLetter = cur.name[0].toUpperCase();

    firstLetter.replace('Á', 'A');
    firstLetter.replace('Â', 'A');
    firstLetter.replace('É', 'E');
    firstLetter.replace('Ê', 'E');
    firstLetter.replace('Í', 'I');
    firstLetter.replace('Ó', 'O');
    firstLetter.replace('Ú', 'U');

    return {
      ...acc,
      [firstLetter]: [...acc[firstLetter] || [], cur]
    };
  }, {});
}

function sections(array) {
  return Object.keys(array).sort().map((letter) => ({
    title: letter,
    data: array[letter],
    numberOfFavorites: array[letter].reduce((acc, cur) => (cur.favorite ? ++acc : acc), 0)
  }));
}

export default async function fetchContacts() {
  const request = await fetch(`https://randomuser.me/api/?nat=br&results=${NUMBER_OF_CONTACTS}`);
  const { results } = await request.json();

  let id = 0;

  const formatted = results.map((user) => handleUser(user, id++)).sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  return sections(splitArray(formatted));
};