import React, { Component } from 'react';
import Comics from './containers/Comics/Comics';
import './static/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Comics/>
      </div>
    );
  }
}

export default App;
