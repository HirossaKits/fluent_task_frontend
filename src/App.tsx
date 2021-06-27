import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Main from './features/main/Main';


function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Navbar />
        <Main />

      </header>
    </div>
  );
}

export default App;
