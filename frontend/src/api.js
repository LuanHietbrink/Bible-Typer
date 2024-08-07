//intercepter

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //import anything specified in .env file. don't have to specify the base URL everytime
})

//check if we have an access token in local storage. If yes, add to headers of API call
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default api;