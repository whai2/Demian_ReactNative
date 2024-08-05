import axios from 'axios';
import Config from 'react-native-config';

console.log(Config.BACKEND_URL)
const client = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});


export default client;