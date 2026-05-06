import axios from 'axios';
import { LocalStorageUser } from '../utils/store';

export const designflixApiInterceptors = axios.create({
  baseURL: import.meta.env.VITE_BACKOFFICE_API_URL,
});

designflixApiInterceptors.interceptors.request.use(
  (config) => {
    const user = LocalStorageUser.getUserData();

    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
