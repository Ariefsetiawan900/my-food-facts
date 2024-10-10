import axios from 'axios';

const baseURL = 'https://world.openfoodfacts.org/api/v2';

const axiosConfig = axios.create({
  baseURL,
});

axiosConfig.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfig.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axiosConfig;
