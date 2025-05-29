import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",   // <— seu backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // se seu backend usar cookies/CORS
});

export default api;