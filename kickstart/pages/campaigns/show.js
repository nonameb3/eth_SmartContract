import React, { Component } from 'react'
import Campaign from '../../ethereum/campaign'
import { Card, Grid } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import Layout from '../../components/Layout'
import ContributeForm from '../../components/contributeForm'

export class Show extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = Campaign(address)
    const summary = await campaign.methods.getSummary().call()

    return {
      address: address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
  }

  renderCard = () => {
    const { minimumContribution, balance, requestsCount, approversCount, manager } = this.props
    const items = [
      {
        header: manager,
        description: 'Address who create this campaign and can create a requests for withdraw.',
        meta: 'Address of Manager',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        description: 'You must contribution at lesast this wei to become an approver.',
        meta: 'Minimum Contribution (wei)'
      },
      {
        header: requestsCount,
        description: 'A requests tries to withdraw money form contract, Request must be approved by approvers',
        meta: 'Number of Requests'
      },
      {
        header: approversCount,
        description: 'Number of prople who already donated to this campaign.',
        meta: 'Number of Approvers'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        description: 'The Balance is how much this campaign has left to spend.',
        meta: 'Campaign Balance (ether)'
      }
    ]

    return <Card.Group items={items}/>
  }

  render() {
    return (
       <Layout>
         <h4>Campaign Detail</h4>
         <Grid>
           <Grid.Column width={10}>
            {this.renderCard()}
           </Grid.Column>
           <Grid.Column width={6}>
            <ContributeForm address={this.props.address}/>
           </Grid.Column>
         </Grid>
       </Layout>
    )
  }
}

export default Show
