import React from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react'
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
        description: <a>campaign link</a>,
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
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <h3>Open Campaign</h3>
          <Button floated="right" content="Create Campaign" icon="add circle" primary/>
          {this.randerCampaigns()}
        </Layout>
      </div>
    )
  }
}

export default index
