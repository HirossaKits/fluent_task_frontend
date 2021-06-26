import React from 'react';
import { store } from './app/store';
import { Provider } from 'react-redux';
import {Route,BrowserRouter} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'
import Auth from './features/auth/Auth'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Route exact path='/' component={Auth}/>
          {/* <Route exact path='/app' component={App}/> */}
        </BrowserRouter>
      </CookiesProvider>
    </Provider>

      </header>
    </div>
  );
}

export default App;
