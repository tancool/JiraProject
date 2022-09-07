import qs from "qs";
import * as auth from 'auto-provider';
import { useAuth } from "context/auth-context";

interface Config extends RequestInit {
  token?: string;
  data?: object;
}
const apiUrl = process.env.REACT_APP_API_URL;



const http = (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {

  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  };

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      // 如果未登录
      if (response.status === 401) {
        // 这里也可以直接使用logout的hook.
        // 但是这样做是不符合需求的.如果未登录,直接重新刷新页面即可.
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: '请重新登录' });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
    );
}

const useHttp = () => {
  const { user } = useAuth();
  return (...[endPoint, config]: Parameters<typeof http>) => http(endPoint, { ...config, token: user?.token });
}
export {
  http,
  useHttp
}
