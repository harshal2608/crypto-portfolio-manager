import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalThemeProvider from "./theme/index";

ReactDOM.render(
  <React.StrictMode>
    <GlobalThemeProvider>
      <CssBaseline />
      <App />
    </GlobalThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
