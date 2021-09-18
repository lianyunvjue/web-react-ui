import _ from 'lodash';
import axios from 'axios';
import { message } from 'antd';
import Storage from './localStorage';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '服务连接异常，请检查网络或后端服务状态后重试。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/* axios配置 */
axios.defaults.timeout = 120000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = process.env.SERVERIP || 'http://192.168.1.10:3000'; // 'http://localhost:3000';

/* axios请求配置 */
axios.interceptors.request.use(
  (config: any) => {
    const token = Storage.getItem('token');
    if (token != null && config.url != '/api/login') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === 'post') {
      // config.headers.Authorization = `Bearer ${token}`;
      if (config.url) {
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
      } else {
        config.data = config.data;
      }
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

/* axios接受配置 */
axios.interceptors.response.use((res: any) => {
  if (res.status !== 200) {
    return Promise.reject(res);
  }
  return res;
}),
  (error: any) => {
    return Promise.reject(error);
  };

/* 向服务器发出请求 */
const fetch = (options: any) => {
  console.log('Request: ', options);
  const { method = 'get', data, url } = options;
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, { params: data });
    case 'delete':
      return axios.delete(url, { params: data });
    case 'head':
      return axios.head(url, data);
    case 'post':
      return axios.post(url, data);
    case 'patch':
      return axios.patch(url, data);
    case 'put':
      return axios.put(url, data);
    default:
      return axios(options);
  }
};

/* 成功获取数据处理 */
const handleData = (res: any) => {
  console.log('Responce Success: ', res);
  return res.data;
};

/* 错误信息处理 */
const handleError = (error: any) => {
  console.log('Responce Error: ', error);
  const { data } = error.response;
  console.log('data------------', data);
  if (data.errors) {
    message.error(`${data.errors}`, 5);
  } else if (data.error.detail) {
    message.error(data.error.detail, 5);
  } else if (data.error) {
    message.error(`${data.error}`, 5);
  } else {
    message.error('未知错误！', 5);
  }
  return { success: false };
};

/* 调用API发送请求 */
export default function request(options: any) {
  return fetch(options).then(handleData).catch(handleError);
}
