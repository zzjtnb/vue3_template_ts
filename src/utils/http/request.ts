// http.ts
import axios, {type AxiosRequestConfig, type AxiosResponse} from 'axios';
import {ElMessage, ElLoading} from 'element-plus';
// import qs from 'qs';

import {t} from '@/plugins/i18n';
import httpCode from './httpCode';
import router from '@/router';

const store = JSON.parse(localStorage.getItem('user') || '{}');
const loadOption = {
  fullscreen: true,
  lock: true,
  text: 'Loading...',
  background: 'rgba(0, 0, 0, 0.7)',
};

let loadingInstance: any = null;
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = (msg = t('message.token')) => {
  localStorage.removeItem('user');
  ElMessage.error(msg);
  router.replace({path: 'login'});
};
// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map();

/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, JSON.stringify(config.params), JSON.stringify(config.data)].join('&');
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // 如果 pending 中不存在当前请求，则添加进去
        pending.set(url, cancel);
      }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: AxiosRequestConfig) => {
  const url = [config.method, config.url, JSON.stringify(config.params), JSON.stringify(config.data)].join('&');
  if (pending.has(url)) {
    // 如果在 pending 中存在当前请求标识,需要取消当前请求,并且移除
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};
/**
 * 清空 pending 中的请求(在路由跳转时调用)
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

/**
 * 实例化请求配置
 */
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? `/` : '/api',
  // 请求时长
  timeout: 1000 * 20,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin-Type': '*',
  },
  transformRequest: [
    (data) => {
      data = JSON.stringify(data);
      return data;
    },
  ],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true;
  },
  // 表示跨域请求时是否需要使用凭证
  withCredentials: false,
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    loadingInstance = ElLoading.service(loadOption);
    removePending(config as any); // 在请求开始前，对之前的请求做检查取消操作
    addPending(config); // 将当前请求添加到 pending 中
    //获取token，并将其添加至请求头中
    if (store.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `${store.token}`;
      if (store.expires < Math.round(new Date().getTime())) {
        toLogin();
      }
    }
    return config;
  },
  (error) => {
    loadingInstance.close();
    // 错误抛到业务代码
    error.data = {};
    error.data.msg = t('axios.error');
    return Promise.resolve(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    loadingInstance.close();
    // 在请求结束后，移除本次请求
    removePending(response as any);
    //响应状态
    // const status = response.status;
    // console.log(status);
    //在这里对返回的数据进行处理
    const responseData = response.data;
    if (responseData.code == '401') toLogin(responseData.message);
    return Promise.resolve(response);
  },
  (error) => {
    loadingInstance.close();
    // handle error code
    // 错误抛到业务代码
    error.data = {};
    if (axios.isCancel(error as any)) {
      error.data.message = t('axios.duplicate');
    } else {
      if (error.response) {
        // 根据请求失败的http状态码去给用户相应的提示
        const status = error.response.status;
        error.data.message = status in httpCode ? httpCode[status] : error.response.data.message;
        ElMessage({message: error.data.message, type: 'error'});
        // token或者登陆失效情况下跳转到登录页面
        if (error.response.status === 401) toLogin(error.response.data.message);
      } else {
        error.data.message = t('axios.timeout');
        ElMessage.error(error.data.message);
      }
    }
    return Promise.reject(error);
  },
);

/**
 * 统一封装GET请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const GET = (url: string, params?: any, config?: any) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    service({
      method: 'GET',
      url,
      params,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * 统一封装post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const POST = (url: string, data?: any, config?: any) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    service({
      method: 'POST',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * 统一封装put请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const PUT = (url: string, data?: any, config?: any) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    service({
      method: 'PUT',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * 统一封装PATCH请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const PATCH = (url: string, data?: any, config?: any) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    service({
      method: 'PATCH',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * 统一封装DELETE请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 * @param {Object} config [请求时配置]
 */
export const DELETE = (url: string, data?: any, config?: any) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    service({
      method: 'DELETE',
      url,
      data,
      ...config,
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export default service;
