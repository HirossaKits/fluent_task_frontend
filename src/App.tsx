import React from 'react';
import { useSelector } from 'react-redux';
// import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Main from './features/main/Main';
import Auth from './features/auth/Auth';
import {
  selectIsAuthenticated,
  selectPersonalSettings,
} from './features/auth/authSlice';

function App() {
  const settings = useSelector(selectPersonalSettings);
  const theme = createTheme({
    typography: {
      fontFamily: ['M PLUS Rounded 1c', 'Roboto'].join(','),
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
      mode: settings.dark_mode ? 'dark' : 'light',
    },
  });

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          {/* <BrowserRouter>
            <Route exact path="/" component={Auth} />
            <Route exact path="/app" component={Main} />
            <Route
              exact
              path="/index.html"
              render={({ location }) => <Redirect to="/" />}
            />
          </BrowserRouter> */}
          {isAuthenticated ? <Main /> : <Auth />}
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
