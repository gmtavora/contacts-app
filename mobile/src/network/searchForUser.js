import { HOST, PORT } from '@env';

export default async function searchForUser(id, token, word) {
  const response = await fetch(`${HOST}:${PORT}/contacts/search`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({id, token, word})
  });

  if (response.ok) {
    const {results} = await response.json();
    return results;
  }

  const errorMessage = await response.text();
  
  throw new Error(errorMessage);
};