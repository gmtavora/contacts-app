import { host } from './constants';
import axios from 'axios';

export default async function updateAvatar(id, token, data) {
  const config = {
    headers: {
      id,
      token,
      'content-type': `multipart/form-data; boundary=${data._boundary}`
    }
  }

  try {
    const response = await axios.post(`${host}/user/changeAvatar`, data, config);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

/*import { host } from './constants';

export default async function updateAvatar(id, token, data) {
  const response = await fetch(`${host}/user/changeAvatar`, {
    method: "POST",
    headers: {id, token},
    body: data.avatar
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}*/