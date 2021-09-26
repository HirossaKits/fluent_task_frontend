import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Nav from "./features/nav/Nav";
import { selectSettings } from "./features/nav/navSlice";

function App() {
  const settings = useSelector(selectSettings);

  const theme = createTheme({
    palette: {
      type: settings.dark_mode ? "dark" : "light",
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
