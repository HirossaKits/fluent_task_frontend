/** @jsxImportSource @emotion/react */
import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./features/nav/Nav";
import { selectSettings } from "./features/nav/navSlice";

function App() {
  const settings = useSelector(selectSettings);

  const theme = createTheme({
    typography: {
      fontFamily: ["Noto Sans JP", "M PLUS Rounded 1c"].join(","),
      fontSize: 12,
    },
    palette: {
      text: {
        primary: "rgba(0, 0, 0, 0.7)",
      },
      mode: settings.dark_mode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <header className='App-header'>
          <Nav />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
