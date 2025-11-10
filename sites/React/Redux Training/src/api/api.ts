import axios from 'axios'

export const api = axios.create({
  baseURL: '/',
})

api.interceptors.request.use((config) => {
  config.headers['X-App'] = 'ReduxTraining';
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      return Promise.reject(new Error("Server error"));
    }
    return Promise.reject(error);
  }
);