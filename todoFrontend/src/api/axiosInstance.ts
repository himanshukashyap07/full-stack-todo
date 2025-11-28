import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./authStorage";


export const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", 
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest: any = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post("/auth/refresh");
        setAccessToken(data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch {
        clearAccessToken();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
