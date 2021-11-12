import { HOST, PORT } from '@env';

export default async function setFavorite(token, id, favorite) {
  const response = await fetch(`${HOST}:${PORT}/favorites/add`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({token, id, favorite})
  });

  if (response.ok) {
    return;
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
};