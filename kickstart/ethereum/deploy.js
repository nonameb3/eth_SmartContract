const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const compiledCampaignFactory = require('./build/CampaignFactory.json')

const provider = new HDWalletProvider(
  'together error tragic other final where dilemma chunk dream drip example grain',
  'https://rinkeby.infura.io/v3/c92f5174a24c4d9e808c8de5c1238a00'
)

const web3 = new Web3(provider)
const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  
  console.log('deploy form account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(compiledCampaignFactory.interface)).deploy({
    data: compiledCampaignFactory.bytecode
  }).send({
    from: accounts[0],
    gas: '1000000'
  })

  console.log('contract deploy to', result.options.address)
}

deploy()
