import axios from 'axios';
import { ToastNotifyError } from '../components/Toast/ToastNotify';

const client = () => {
  const defaultOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  API.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response: { data: { message } = {}, status } = {} } = error;
      if (status === 401) {
        ToastNotifyError(message);
      } else if (parseInt(status / 100) === 5) {
        ToastNotifyError(message);
      }
      return error;
    },
  );

  return {
    get: (url, options = {}) =>
      API.get(url, { ...defaultOptions, ...options }).catch((error) => {
        return error;
      }),
    post: (url, data, options = {}) =>
      API.post(url, data, { ...defaultOptions, ...options }).catch((error) => {
        return error;
      }),
    patch: (url, data, options = {}) =>
      API.patch(url, data, { ...defaultOptions, ...options }).catch((error) => {
        return error;
      }),
    put: (url, data, options = {}) =>
      API.put(url, data, { ...defaultOptions, ...options }).catch((error) => {
        return error;
      }),
    delete: (url, options = {}) =>
      API.delete(url, { ...defaultOptions, ...options }).catch((error) => {
        return error;
      }),
  };
};

const getAuthorization = (getState, ...restProps) => {
  const API = client({ ...restProps[0] });
  return API;
};

export { getAuthorization };
export default client;
