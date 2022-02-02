import axios from "axios";
const instance = axios.create({
  baseURL: import.meta.env.VITE_baseURL,
  headers: {
    "X-CMC_PRO_API_KEY": import.meta.env.VITE_API_KEY,
    Accept: "application/json",
    mode: "cors",
    // "Accept-Encoding": "deflate,gzip",
  },
});

export default instance;
