import { host } from './constants';

export default async function changePassword(data) {
  const response = await fetch(`${host}/user/changePassword`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}