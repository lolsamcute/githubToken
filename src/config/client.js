import axios from 'axios';
import successInterceptor from './interceptors/responses/success';
import failureInterceptor from './interceptors/responses/failure';

const axiosObject = {
  baseURL: 'http://localhost:8000',
  timeout: 50000,
};
const authToken = localStorage.getItem('accessToken');

// eslint-disable-next-line no-unused-expressions
authToken ? axiosObject.Authorization = `Bearer ${authToken}` : '';

const client = axios.create(axiosObject);

client.interceptors.response.use(successInterceptor, failureInterceptor);

export default client;
