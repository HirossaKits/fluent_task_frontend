import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import SignIn from './features/auth/SignIn';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <SignIn />

      </header>
    </div>
  );
}

export default App;
