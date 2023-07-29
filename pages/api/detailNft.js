import API from './base';

const detailNftApi = async ({ id, token, isProfile }) =>
  API()
    .request({
      url: `crystals/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        isProfile,
      },
    })
    .then((response) => response.data)
    .catch((error) => error);

export default detailNftApi;
