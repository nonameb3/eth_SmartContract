import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3'
import lottery from './lottery'

class App extends Component {
  state = {
    manager: ''
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call()
    this.setState({ manager })
  }

  render() {
    return (
      <div className="App">
        <h3>Lottery Contract</h3>
        <p>This Contract managed by {this.state.manager}</p>
      </div>
    );
  }
}

export default App;
