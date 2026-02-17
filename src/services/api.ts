import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const autorize = localStorage.getItem("@dugout/token");
    if (autorize) config.headers!.Authorization = `Bearer ${autorize}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
    return error.data.message;
  },
);

export default api;
