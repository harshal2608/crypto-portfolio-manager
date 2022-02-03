import axios from "axios";
const instance = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
  headers: {
    "X-CMC_PRO_API_KEY": import.meta.env.VITE_API_KEY,
    Accept: "application/json",
    mode: "cors",
    // "Accept-Encoding": "deflate,gzip",
  },
});

export default instance;
