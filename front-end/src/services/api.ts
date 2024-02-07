
import axios from 'axios';
import data from '../../../back-end/config/default.json';


const api = axios.create({
  baseURL: `http://localhost:${data.port}/`,
});

export default api;