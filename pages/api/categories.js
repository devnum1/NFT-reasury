import API from './base';

const categoriesApi = async () =>
  API()
    .request({
      url: 'crystals/category-count',
      method: 'GET',
    })
    .then((response) => response.data)
    .catch((error) => error);

export default categoriesApi;
