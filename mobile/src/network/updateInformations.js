import { host } from './constants';

export default async function updateInformations(formdata) {
  const response = await fetch(`${host}/user/updateInformations`, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(formdata)
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}