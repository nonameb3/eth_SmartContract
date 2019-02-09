const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const compiledCampaignFactory = require('../ethereum/build/CampaignFactory.json')
const compiledCampaign = require('../ethereum/build/Campaign.json')

let accounts
let factory
let CampaignAddress
let campaign
beforeEach(async () => {
  // get a list of accounts
  accounts = await web3.eth.getAccounts()

  // use one of this to deploy
  factory = await new web3.eth.Contract(JSON.parse(compiledCampaignFactory.interface)).deploy({
    data: compiledCampaignFactory.bytecode
  }).send({
    from: accounts[0],
    gas: '1000000'
  })

  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  })

  let [address] = await factory.methods.getDeployCampaigns().call()
  CampaignAddress = address

  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    CampaignAddress
  )

  factory.setProvider(provider)
})

describe('Campaign', () => {
  it('deploy an contracts', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })
})