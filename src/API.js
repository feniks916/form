import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/sign-up',
});

const postData = data =>
  instance.post('', data);

export default postData;
