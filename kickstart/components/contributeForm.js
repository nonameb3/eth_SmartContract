import React, { Component } from 'react'
import { Form, Button, Input, Message } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

export class contributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  }

  onSubmit= async event => {
    event.preventDefault()

    this.setState({ loading: true, errorMessage: '' })
    try {
      const campaign = Campaign(this.props.address)
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      })

      Router.replaceRoute(`/campaigns/${this.props.address}`)
    } catch (error) {
      this.setState({ loading: false, errorMessage: error.message })
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to Contribute</label>
          <Input
            value={this.state.value}
            onChange={event=>this.setState({value:event.target.value})}
            label="ether" 
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage}/>
        <Button primary loading={this.state.loading}>
          Contribute!
        </Button>
      </Form>
    )
  }
}

export default contributeForm
