import jwtDecode from 'jwt-decode';
//
import axios from './axios';
// config
import { ACCESS_TOKEN_KEY, JWT_SECRET } from 'src/config';

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken, JWT_SECRET);
  const currentTime = Date.now() / 1000;

  return new Date(decoded.exp) > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
