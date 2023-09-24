import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const Axios = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL });
Axios.interceptors.response.use(
  ({ data }) => data,
  (error: AxiosError<{ message?: string }>) => {
    if (error.code === AxiosError.ERR_CANCELED) return;
    if (error.code === AxiosError.ERR_NETWORK)
      error.message = '네트워크 에러가 발생했어요.';
    throw error;
  },
);

type AxiosGetParams = {
  path?: string[] | string;
  query?: any;
  signal?: AbortSignal;
};

export const get = <T>(
  url: string,
  { path, query, signal }: AxiosGetParams = {},
) => {
  const config: AxiosRequestConfig = {};
  if (path !== undefined) {
    if (Array.isArray(path)) url += `/${path.join('/')}`;
    else url += `/${path}`;
  }
  if (query !== undefined) config.params = query;
  if (signal !== undefined) config.signal = signal;

  // T를 반환값으로 사용한다. (참고: https://github.com/axios/axios/issues/1510#issuecomment-396894600)
  return Axios.get<T, T>(url, config);
};

export const post = <T, D>(url: string, body: D) => {
  return Axios.post<T, T, D>(url, body);
};
