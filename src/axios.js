import axios from "axios";
const instance = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
  headers: {
    "X-CMC_PRO_API_KEY": "3297bbec-def4-46ef-80cb-301d24c4bfd4",
    Accept: "application/json",
    mode: "cors",
    // "Accept-Encoding": "deflate,gzip",
  },
});

export default instance;
