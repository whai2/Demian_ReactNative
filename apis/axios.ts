import axios from 'axios';
import { getToken } from '@/async-storage/jwtToken';
import { BACKEND_URL } from "@env"

const client = axios.create({
  baseURL: `${BACKEND_URL}/api`,
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