import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Link } from '../../../routes'
import Layout from '../../../components/Layout'
import RenderRow from '../../../components/RenderRow'
import Campaing from '../../../ethereum/campaign'

export class index extends Component {
  static async getInitialProps(props) {
    const { address } = props.query
    const campaign = Campaing(address)
    const requestsCount = await campaign.methods.getRequestsCount().call()
    const approversCount = await campaign.methods.approversCount().call()

    console.log(approversCount)
    const requests = await Promise.all(
      Array(parseInt(requestsCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call()
      })
    )

    return { address, requests, requestsCount, approversCount }
  }

  renderRow = () => {
    return this.props.requests.map((request, index) => {
      return (
        <RenderRow 
          key={index}
          id={index}
          address={this.props.address}
          request={request}
          approversCount={this.props.approversCount}
        />
      )
    })
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
            <Button primary floated="right" style={{marginBottom:"10px"}}>New Request</Button>
        </Link>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Recipient</Table.HeaderCell>
              <Table.HeaderCell>Approval Count</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
              <Table.HeaderCell>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.renderRow()}
          </Table.Body>
        </Table>
        <div>Found {this.props.requestsCount} requests.</div>
      </Layout >
    )
  }
}

export default index
