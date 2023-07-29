import API from './base';

const likeNftAPI = async ({ id, token }) =>
  API()
    .request({
      url: `crystals/like/${id}`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);

export default likeNftAPI;
