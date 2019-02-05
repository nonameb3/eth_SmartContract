const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const { interface, bytecode } = require('../compile')

let accounts
let lottery
beforeEach( async() => {
  // get a list of accounts
  accounts = await web3.eth.getAccounts()

  // use one of this to deploy
  lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({
    data: bytecode
  }).send({
    from: accounts[0],
    gas: '1000000'
  })

  lottery.setProvider(provider)
})

describe('lottery', () => {
  it('depoly a contracts', () => {
    assert.ok(lottery.options.address)
  })

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('1','ether')
    })
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    })

    assert.equal(accounts[0], players[0])
    assert.equal(1 ,players.length)
  })

  it('allows multiple account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('1','ether')
    })
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('1','ether')
    })
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('1','ether')
    })
    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    })

    assert.equal(accounts[0], players[0])
    assert.equal(accounts[1], players[1])
    assert.equal(accounts[2], players[2])
    assert.equal(3 ,players.length)
  })

  it('require minimum amount of ether to enter.', async () => {
    try {
      await lottery.methods.enter().send({
        form: accounts[0],
        value: 0
      })

      assert(false)
    } catch (error){
      assert(error)
    }
  })

  it('only manager cal call pickWiner', async () => {
    try {
      await lottery.methods.pickWiner().send({
        form: accounts[1]
      })
      
      assert(false)
    } catch (error) {
      assert(error)
    }
  })

  it('send money to winer and reset player array', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    })

    const initalBalance = await web3.eth.getBalance(accounts[0])

    await lottery.methods.pickWiner().send({
      from: accounts[0]
    })

    const finalBalance = await web3.eth.getBalance(accounts[0])
    const difference = finalBalance - initalBalance
    assert(difference > web3.utils.toWei('1.8', 'ether'))
  })
})