import { host } from "./constants";

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

export default async function fetchContacts(token, id) {
  const response = await fetch(`${host}/contacts`, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({token, id})
  });

  if (response.ok) {
    const {contacts} = await response.json();

    const nameAsc = contacts.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      else return 0;
    });

    return sections(splitArray(nameAsc));
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
};