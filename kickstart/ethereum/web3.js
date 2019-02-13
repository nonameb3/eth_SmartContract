import Web3 from 'web3'

let web3

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  // in browser && metamake are running
  web3 = new Web3(window.web3.currentProvider)
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/c92f5174a24c4d9e808c8de5c1238a00'
  )
  web3 = new Web3(provider)
}

export default web3
