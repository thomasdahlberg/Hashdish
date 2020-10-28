import axios from "axios";
import LocalStorageService from "./localStorageService";

// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    console.log('Axios Interceptors');
    const token = localStorageService.getAuthToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

var API_URL = 'https://dev.hashdish.com/'
if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://api.hashdish.com/'
}

//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url === `${API_URL}v1.0/kitchen/refresh`) {
    //    router.push('/login'); 
    // <Redirect to="/login" />
    return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorageService.getRefreshToken();
    return axios.post(`${API_URL}v1.0/kitchen/refresh`,
        {
            "refreshToken": refreshToken
        })
        .then(res => {
            if (res.status === 201) {
                localStorageService.setToken(res.data);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAuthToken();
                return axios(originalRequest);
            }
        })
}
return Promise.reject(error);
});

const kitchenInstance = axios.create({
  baseURL:`${API_URL}v1.0/`
});

kitchenInstance.interceptors.request.use(
  (config) => {
    console.log('Axios Interceptors');
    const token = localStorageService.getAuthToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);



export default kitchenInstance;