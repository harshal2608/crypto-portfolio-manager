import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const jediPink = "#FF00E9";

function colors() {
  return {
    jediPink,
  };
}
const theme = createTheme({
  ...colors(),
});

export default function GlobalThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
