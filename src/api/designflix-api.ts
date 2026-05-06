import axios from 'axios';

export const designflixApi = axios.create({
  baseURL: import.meta.env.VITE_BACKOFFICE_API_URL,
});
