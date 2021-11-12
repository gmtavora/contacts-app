import { HOST, PORT } from '@env';

export default async function login(username, password) {
  const response = await fetch(`${HOST}:${PORT}/login`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({username, password})
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}