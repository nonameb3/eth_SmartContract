import React, { Component } from 'react'
import Campaign from '../../ethereum/campaign'

export class Show extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address)
    const summary = await campaign.methods.getSummary().call()

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    }
  }

  render() {
    return (
       <div>
         Show Page
       </div>
    )
  }
}

export default Show
