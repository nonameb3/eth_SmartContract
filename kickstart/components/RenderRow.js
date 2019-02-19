import React, { Component } from 'react'
import { Table, Button } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'

export class RenderRow extends Component {
  onApprove = async () => {
    console.log('onApproveClick')
    const { address } = this.props
    const campaign = Campaign(address)
    const account = await web3.eth.getAccounts()

    try {
      await campaign.methods.approvalRequest(this.props.id).send({
        from: account[0]
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  onFinaliza = async () => {
    console.log('onFinalizaisClick')
    const { address } = this.props
    const campaign = Campaign(address)
    const account = await web3.eth.getAccounts()

    try {
      await campaign.methods.finalizeRequest(this.props.id).send({
        from: account[0]
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { id, request, approversCount } = this.props
    const readyToFinaliza = request.approvalCount > approversCount/2
    return (
      <Table.Row disabled={request.complete}  positive={readyToFinaliza && !request.complete}>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{request.decription}</Table.Cell>
        <Table.Cell>{web3.utils.fromWei(request.value, 'ether')}</Table.Cell>
        <Table.Cell>{request.recipient}</Table.Cell>
        <Table.Cell>{request.approvalCount}/{approversCount}</Table.Cell>
        <Table.Cell>{ request.complete ? null: (
          <Button color="green" basic onClick={this.onApprove}>Approve</Button>
          )
        }
        </Table.Cell>
        <Table.Cell>{request.complete ? null: (
          <Button color="teal" basic onClick={this.onFinaliza}>Finaliza</Button>
          )
        }
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default RenderRow
