import axios from "axios";
const instance = axios.create({
  baseURL: "https://cors-for-portfolio.herokuapp.com/",
  // headers: {
  //   "X-CMC_PRO_API_KEY": "3297bbec-def4-46ef-80cb-301d24c4bfd4",
  //   Accept: "application/json",

  //   // "Accept-Encoding": "deflate,gzip",
  // },
});

export default instance;
