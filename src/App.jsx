import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    name: 'Auth0 React sample app',
  };

  render() {
    const { name } = this.state;
    return (
      <div className="App">
        <h1>{`Welcome to ${name}`}</h1>
      </div>
    );
  }
}

export default hot(module)(App);
