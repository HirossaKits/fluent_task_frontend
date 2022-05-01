import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Main from './features/main/Main';
import Auth from './features/auth/Auth';
import { selectDarkmode } from './features/auth/authSlice';

function App() {
  const darkmode = useSelector(selectDarkmode);
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
      mode: darkmode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Route exact path="/login" component={Auth} />
            <Route
              exact
              path="/"
              render={({ location }) =>
                localStorage.getItem('localJWT') ? (
                  <Main />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/index.html"
              render={({ location }) => <Redirect to="/" />}
            />
          </BrowserRouter>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
