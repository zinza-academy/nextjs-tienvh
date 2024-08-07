import axios from 'axios';

const baseURL = 'http://localhost:3000';
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const fileApi = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export { fileApi };

export default api;
