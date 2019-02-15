import React from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
import { Link } from '../routes'
import Layout from '../components/Layout'

class index extends React.Component{
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployCampaigns().call()
    return { campaigns }
  }

  randerCampaigns(){
    const items = this.props.campaigns.map(address => {
      return{
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>campaign link</a>
          </Link>
        ),
        fluid: true
      }
    })
    
    return <Card.Group items={items}/>
  }

  render(){
    console.log(this.props.campaigns)
    return(
      <div>
        <Layout>
          <h3>Open Campaign</h3>
          <Link route="/campaigns/new">
            <Button floated="right" content="Create Campaign" icon="add circle" primary/>
          </Link>
          {this.randerCampaigns()}
        </Layout>
      </div>
    )
  }
}

export default index
