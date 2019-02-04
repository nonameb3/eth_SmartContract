const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const { interface, bytecode } = require('../compile')

let accounts
let inbox
beforeEach( async() => {
  // get a list of accounts
  accounts = await web3.eth.getAccounts()

  // use one of this to deploy
  inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({
    data: bytecode
  }).send({
    from: accounts[0],
    gas: '1000000'
  })

  inbox.setProvider(provider)
})

describe('Inbox', () => {
  it('depoly a contracts', () => {
    assert.ok(inbox.options.address)
  })

  it('has default message', async() => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'hi')
  })

  it('has change message', async() => {
    await inbox.methods.SetMessage('bye').send({ from: accounts[0] })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'bye')
  })
})