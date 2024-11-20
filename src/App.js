import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import TuringMachine from './components/TuringMachine.tsx';

function App() {
  const [ww, setWw] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWw(typeof window !== "undefined" ? window.innerWidth : 0))
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ marginLeft: ww > 700 ? '35%' : '22%' }} />
        <TuringMachine ww={ww} />
      </header>
    </div>
  );
}

export default App;
