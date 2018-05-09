import React, { Component } from 'react';
import './App.css';

import GameStart from './components/GameStart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameStart />
      </div>
    );
  }
}

export default App;
