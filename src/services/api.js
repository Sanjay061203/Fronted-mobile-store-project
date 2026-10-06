import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-mobile-store-project-7q7m.onrender.com"
});

export default api;