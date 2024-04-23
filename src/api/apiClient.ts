import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.BASE_URL || 'https://api.wikimedia.org';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const _get = (url: string, config: AxiosRequestConfig = {}) => {
  return apiClient.get(url, config);
};

export { _get };
