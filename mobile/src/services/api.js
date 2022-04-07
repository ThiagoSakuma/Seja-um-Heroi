import axios from 'axios';

const api = axios.create({
  /*baseURL: 'http://172.19.7.137:3333'*/
 baseURL: 'http://192.168.15.175:3333'
});

export default api;