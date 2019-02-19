import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  // '0x62dB0060c49e52A43F641179A8C18E6FBd8Ff6e3'
  '0x379FeC10f4DdF5A12944661843Df72cF4eBA994A' // address to deploy
)

export default instance
