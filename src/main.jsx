import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalThemeProvider from "./theme/index";
import GlobalProvider from "./context/globalContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalThemeProvider>
      <GlobalProvider>
        <CssBaseline />
        <App />
      </GlobalProvider>
    </GlobalThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
