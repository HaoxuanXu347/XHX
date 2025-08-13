// src/api/client.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // set at build time
  withCredentials: true,                      // keep cookies for auth
});

export default api;

