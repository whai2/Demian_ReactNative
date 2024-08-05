import axios from 'axios';
import Config from 'react-native-config';
import { getToken } from '@/async-storage/jwtToken';

const client = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    'Content-type': 'application/json',
  },
  // withCredentials: true,
});

client.interceptors.request.use(
  async config => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);


export default client;