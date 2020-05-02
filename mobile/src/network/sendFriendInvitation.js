import { host } from './constants';

export default async function sendFriendInvitation(token, requester, requested) {
  const response = await fetch(`${host}/request/send`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify({token, requester, requested})
  });

  if (response.ok) {
    return;
  }

  const errorMessage = await response.text();

  throw new Error(errorMessage);
}