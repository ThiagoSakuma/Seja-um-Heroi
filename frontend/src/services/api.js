import axios from 'axios';

//Cliente http, url padrao de todas as chamadas
const api = axios.create({
  baseURL: 'http://localhost:3333'
});

export default api;