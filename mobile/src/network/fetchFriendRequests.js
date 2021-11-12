import { HOST, PORT } from '@env';

export default async function fetchFriendRequests(token, requested) {
  const response = await fetch(`${HOST}:${PORT}/request`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({token, requested})
  });

  if (response.ok) {
    const {requests} = await response.json();
    return requests;
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
};