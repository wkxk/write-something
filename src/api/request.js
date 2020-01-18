/* eslint-disable no-console */
import axios from "axios";
import { Message, Loading } from "element-ui";
axios.defaults.timeout = 60000;

// 请求拦截器
axios.interceptors.request.use(config => {
  Loading.service({text:"Loading..."});
  return config;
},err => {
  Message.error({ message: '请求超时！' });
  return Promise.resolve(err);
});

// 响应拦截器
axios.interceptors.response.use(
  response => {
    Loading.service().close();
    if (response.data.status && response.data.status != 200) {
      Message.error(response.data && response.data.msg);
      return Promise.reject(response.data);
    }
    if (response.data.code && response.data.code != 0) {
      Message.error(response.data && response.data.msg || response.data.data);
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);
export default axios;
