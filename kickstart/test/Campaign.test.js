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

// test case
describe('Campaign', () => {
  it('deploy an contracts', () => {
    assert.ok(factory.options.address)
    assert.ok(campaign.options.address)
  })

  it('mark caller to campaign manager', async () => {
    const manager = await campaign.methods.manager().call()
    assert.equal(manager, accounts[0])
  })

  it('allow player to contribute money and mark them as approvers', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    })

    const isContributor = await campaign.methods.approvers(accounts[1]).call()
    assert(isContributor)
  })

  it('require a minimum contribute', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: '10'
      })

      assert(false)
    } catch (error) {
      assert(error)
    }
  })

  it('allow manager to create payment request', async () => {
    await campaign.methods.createRequest(
      'make a website',
      '250',
      accounts[1]
    ).send({
      from: accounts[0],
      gas: '1000000'
    })
    console.log('step 1')
    const request = await campaign.methods.requests(0).call()
    assert.equal('make a website', request.decription)
  })

  it('processes requests', async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    })

    await campaign.methods.createRequest('Request', '5', accounts[1]).send({
      from: accounts[0],
      gas: '1000000'
    })

    await campaign.methods.approvalRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    })

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1000000'
    })

    let balance = await web3.eth.getBalance(accounts[1])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)
    
    assert(balance > 104)
  })
})
