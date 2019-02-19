import React, { Component } from 'react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Input, Form, Button, Message } from 'semantic-ui-react'
import Layout from '../../../components/Layout'
import { Link, Route } from '../../../routes'

export class NewRequest extends Component {
  state = {
    description: '',
    value: '',
    recipient: '',
    loading: false,
    errorMessage: ''
  }

  static async getInitialProps(props) {
    return { address: props.query.address }
  }

  onSubmit = async event => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts()
    const campaign = Campaign(this.props.address)
    const { description, value, recipient } = this.state

    this.setState({ loading: true, errorMessage: '' })
    
    try {
      await campaign.methods.createRequest(description, web3.utils.toWei(value, "ether"), recipient).send({
        from: accounts[0]
      })

      Router.pushRoute(`/campaigns/show`)
    } catch (error) {
      this.setState({ errorMessage: error.message })
    }

    this.setState({ loading: false })
  }

  render() {
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <Button primary>Back</Button>
        </Link>
        <h3>Request Form</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event=>this.setState({description:event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={this.state.value}
              onChange={event=>this.setState({value:event.target.value})}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event=>this.setState({recipient:event.target.value})}
            />
          </Form.Field>
          <Message error header="Oop!" content={this.state.errorMessage}/>
          <Button primary loading={this.state.loading}>Create Request</Button>
        </Form>
      </Layout>
    )
  }
}

export default NewRequest
