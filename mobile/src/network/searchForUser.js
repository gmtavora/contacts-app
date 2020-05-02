import { host } from './constants';

export default async function searchForUser(token, word) {
  const response = await fetch(`${host}/contacts/search`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({token, word})
  });

  if (response.ok) {
    const {results} = await response.json();
    return results;
  }

  const errorMessage = await response.text();
  
  throw new Error(errorMessage);
};