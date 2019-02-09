import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3'
import lottery from './lottery'

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)
    this.setState({ manager, players, balance })
  }

  onSubmit = async event => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    this.setState({message: 'Wainting on transaction success.'})
    console.log(web3.utils.toWei(this.state.value, 'ether'))
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })
    this.setState({message: 'You have been entered!!'})
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts()
    this.setState({message: 'Wainting on transaction success.'})
    console.log(web3.utils.toWei(this.state.value, 'ether'))
    await lottery.methods.pickWiner().send({
      from: accounts[0]
    })
    this.setState({message: 'A winner has been pick!!'})
  }

  render() {
    const { value, manager, players, balance, message } = this.state
    return (
      <div className="App">
        <h3>Lottery Contract</h3>
        <p>
          This Contract managed by {manager} there are current {players.length} entered. 
          completing to win {web3.utils.fromWei(balance, 'ether')} ether!
        </p>
        <hr></hr>

        <form onSubmit={this.onSubmit}>
          <h2>Do you want try some luck?</h2>
          <div>
            <label>Amount of ether to enter : </label>
            <input
              value={value}
              onChange={(e)=>this.setState({value: e.target.value})}
            >
            </input>
          </div>
          <button>Submit</button>
        </form>
        <div>
          <h4>Ready to pick a winner?</h4>
          <button onClick={this.onClick}>Pick a winner!</button>
        </div>

        <h1>{message}</h1>
      </div>
    );
  }
}

export default App;
