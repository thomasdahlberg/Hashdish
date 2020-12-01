import axios from 'axios';
import LocalStorageService from './localStorageService';

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// var API_URL = 'https://dev.hashdish.com/';
var API_URL = 'http://local.hashdish.com/';
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://api.hashdish.com/';
}

const kitchenInstance = axios.create({
  baseURL: `${API_URL}v1.0/`,
});

// Add a response interceptor
kitchenInstance.interceptors.request.use(
  (config) => {
    console.log('Axios Request');
    // if (config.url === 'https://dev.hashdish.com/v1.0/kitchen/refresh') {
    if (config.url === 'http://local.hashdish.com/v1.0/kitchen/refresh') {
      const refreshToken = localStorageService.getRefreshToken();
      config.headers['Authorization'] = 'Bearer ' + refreshToken;
    } else {
      const token = localStorageService.getAuthToken();
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
kitchenInstance.interceptors.response.use(
  (response) => {
    console.log('Axios Response');
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === `${API_URL}v1.0/kitchen/refresh`
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorageService.getRefreshToken();
      return kitchenInstance
        .post(`${API_URL}v1.0/kitchen/refresh`, {
          refreshToken: refreshToken,
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.status);
          if (res.status === 200) {
            localStorageService.setToken(res.data);
            kitchenInstance.defaults.headers.common['Authorization'] =
              'Bearer ' + localStorageService.getAuthToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default kitchenInstance;
