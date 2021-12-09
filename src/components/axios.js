import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({ baseURL: 'https://authentication-dev.bmgames.net/v1/auth/' });

// export default boot(({ app }) => {
//   app.config.globalProperties.$axios = axios;
//   app.config.globalProperties.$api = api;
// });
export default boot(({ Vue }) => {
  Vue.prototype.$axios = axios;
  Vue.prototype.$api = api;
});

api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('token'));
    config.headers.common.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export { axios, api };
