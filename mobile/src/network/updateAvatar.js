import { HOST, PORT } from '@env';
import axios from 'axios';

export default async function updateAvatar(id, token, data) {
  const config = {
    headers: {
      id,
      token,
      'content-type': `multipart/form-data`
    }
  };

  if (data) {
    try {
      const response = await axios.post(`${HOST}:${PORT}/user/changeAvatar`, data, config);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  try {
    const response = await axios.post(`${HOST}:${PORT}/user/clearAvatar`, null, {...config, 'content-type': 'application/json'});
    return response;
  } catch(error) {
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