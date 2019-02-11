import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xDa50219D55fF3b6789640c4e25da0F9f0D1c41Fa'
)

export default instance
