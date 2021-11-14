import { HOST, PORT } from '@env';

export default async function changePassword(data) {
  const response = await fetch(`${HOST}:${PORT}/user/changePassword`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(data)
  });

  if (response.ok) {
    return await response.text();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}