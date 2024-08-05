import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;


  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
