import axios from 'axios';

const config = {
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const httpClient = axios.create(config);

export default httpClient;
