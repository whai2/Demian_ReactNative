import axios from 'axios';
import Config from 'react-native-config';

const client = axios.create({
  baseURL: `${Config.BACKEND_URL}/api`,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});


export default client;