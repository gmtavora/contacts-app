import { HOST, PORT } from '@env';

export default async function sendFriendRefusal(token, requested, id) {
  const response = await fetch(`${HOST}:${PORT}/request/refuse`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({token, requested, id})
  });

  if (response.ok) {
    return await response.text();
  }

  const errorMessage = await response.text();
  
  throw new Error(errorMessage);
};