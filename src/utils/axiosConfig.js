import axios from 'axios';
import LocalStorageService from './localStorageService';

const localStorageService = LocalStorageService.getService();

let API_URL;
process.env.NODE_ENV === 'production'
  ? (API_URL = 'https://api.hashdish.com/')
  : (API_URL = 'https://dev.hashdish.com/');

const axiosApiInstance = axios.create({
  baseURL: `${API_URL}v1.0/`,
});

axiosApiInstance.interceptors.request.use(
  (config) => {
    console.log('Axios Request Interceptor');
    if (config.url === `${API_URL}v1.0/kitchen/refresh`) {
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

axiosApiInstance.interceptors.response.use(
  (response) => {
    console.log('Axios Response Interceptor');
    return response;
  },
  (error) => {
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
      return axiosApiInstance
        .post(`${API_URL}v1.0/kitchen/refresh`, {
          refreshToken: refreshToken,
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.status);
          if (res.status === 200) {
            localStorageService.setToken(res.data);
            axiosApiInstance.defaults.headers.common['Authorization'] =
              'Bearer ' + localStorageService.getAuthToken();
            return axiosApiInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;
