import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import TuringMachine from './components/TuringMachine';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ marginLeft: '35%'}}/>
        <TuringMachine/>
      </header>
    </div>
  );
}

export default App;
