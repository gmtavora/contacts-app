import { HOST, PORT } from '@env';

export default async function registerNewUser(userInfo) {
  const response = await fetch(`${HOST}:${PORT}/signup`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(userInfo)
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}