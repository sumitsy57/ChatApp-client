// client/src/axiosSetup.js
import axios from "axios";
import { server } from "./constants/config";

// base url + cookies
axios.defaults.baseURL = server;
axios.defaults.withCredentials = true;

// attach JWT from localStorage to every request
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("chattu-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
