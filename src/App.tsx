import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "./features/nav/Main";
import { selectSettings } from "./features/nav/mainSlice";

function App() {
  const settings = useSelector(selectSettings);

  const theme = createTheme({
    typography: {
      fontFamily: ["M PLUS Rounded 1c", "Roboto"].join(","),
      fontSize: 12,
      //   body1: {
      //     fontSize: "0.875rem",
      //   },
      //   body2: {
      //     fontSize: "0.875rem",
      //   },
      //   caption: {
      //     fontSize: "0.875rem",
      //   },
    },
    palette: {
      // text: {
      //   primary: "rgba(0, 0, 0, 0.7)",
      // },
      mode: settings.dark_mode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <header className='App-header'>
          <Main />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
