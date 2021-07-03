import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from './features/auth/Auth';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'M PLUS Rounded 1c'].join(','),
    fontSize: 14
  },
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.7)"
    },
  },
  // palette: {
  //   type: 'dark',
  // },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <Route exact path='/' component={Auth} />
            <Route exact path='/app' component={App} />
          </BrowserRouter>
        </MuiThemeProvider>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
