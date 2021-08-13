import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Nav from "./features/nav/Nav";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { selectSettings } from "./features/nav/navSlice";

function App() {
  const settings = useSelector(selectSettings);

  const theme = createTheme({
    palette: {
      type: settings.dark_mode ? "dark" : "light",
    },
  });

  return (
    <div className='App'>
      <header className='App-header'>
        <Nav />
      </header>
    </div>
  );
}

export default App;
