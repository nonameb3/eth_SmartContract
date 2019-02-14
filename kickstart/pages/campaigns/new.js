import React, { Component } from 'react'
import { Button, Form, Input, Grid } from 'semantic-ui-react'
import Layout from '../../components/Layout'

export class New extends Component {
  state = {
    minimumContribution: ''
  }

  render() {
    return (
      <Layout>
        <Grid centered columns={2}>
          <Grid.Column>
            <h3>Create a Campaign.</h3>
            <Form>
              <Form.Field>
                <lable>Minimum Contribution </lable>
                <Input
                  label="WEI"
                  labelPosition="right"
                  value={this.state.minimumContribution}
                  onChange={event=>this.setState({minimumContribution:event.target.value})}
                />
              </Form.Field>
                <Button primary>Create</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default New
