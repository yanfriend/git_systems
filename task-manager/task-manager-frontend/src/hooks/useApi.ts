import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Match your FastAPI port
});

export default api;