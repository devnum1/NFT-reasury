import axios from 'axios';

let API;

const setupAPIClient = () => {
  API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://nftreasury.monocle.id/api/v1/',
  });
  
  API.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        return;
      } else {
        return Promise.reject(error);
      }
    }
  );
};

export const initialize = () => {
  // always create new axios instance when cookie changed
  setupAPIClient();

  return API;
};

export default initialize;
