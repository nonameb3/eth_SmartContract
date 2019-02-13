import React from 'react'
import factory from '../ethereum/factory'

class index extends React.Component{
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployCampaigns().call()
    return { campaigns }
  }

  render(){
    console.log(this.props.campaigns)
    return(
      <div>List</div>
    )
  }
}

export default index
