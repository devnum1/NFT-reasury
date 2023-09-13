import API from './base';

const historyApi = async ({ address }) =>
  API()
    .request({
      url: `crystals/like/${address}`,
      method: 'GET',
    })
    .then((response) => response)
    .catch((error) => error);

export default historyApi;
