const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  'mnemonic',
  'https://rinkeby.infura.io/v3/c92f5174a24c4d9e808c8de5c1238a00'
)