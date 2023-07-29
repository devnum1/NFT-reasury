import API from './base';

const carouselAPI = async () =>
  API()
    .request({
      url: 'crystals/random',
      method: 'GET',
      params: {
        limit: 10,
      },
    })
    .then((response) => response.data.records)
    .catch((error) => error);

export default carouselAPI;
