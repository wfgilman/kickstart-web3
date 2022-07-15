import React, { Component } from 'react'
import { Form, Button, Message, Input } from 'semantic-ui-react'
import Campaign from '../../../../ethereum/campaign'
import web3 from '../../../../ethereum/web3'
import Layout from '../../../../components/Layout'
import Router from 'next/router';

interface Props {
  address: string
}

interface State {
  amount: string,
  description: string,
  recipient: string,
  errorMessage: string,
  loading: boolean
}

class RequestNew extends Component<Props, State> {
  state: State = {
    amount: '',
    description: '',
    recipient: '',
    errorMessage: '',
    loading: false
  }

  static async getInitialProps(context) {
    const address = context.query.campaign

    return {
      address: address
    }
  }

  onSubmit = async (event) => {
    event.preventDefault()
    this.setState({ loading: true, errorMessage: '' })
    const campaign = Campaign(this.props.address)
    const {
      amount,
      description,
      recipient
    } = this.state

    try {
      const accounts = await web3.eth.getAccounts()
      await campaign.methods
        .createRequest(description, web3.utils.toWei(amount, 'ether'), recipient)
        .send({ from: accounts[0] })
      Router.push(`/campaigns/${this.props.address}/requests`)
    } catch (err) {
      this.setState({ errorMessage: err.message })
    }
    this.setState({ loading: false })
  }
  
  render() {
    return (
      <Layout title='Create a Request'>
      <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value (ether)</label>
            <Input
              value={this.state.amount}
              onChange={event => this.setState({ amount: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={event => this.setState({ recipient: event.target.value })}
            />
          </Form.Field>
          <Message error header='Oops!' content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    )
  }
}

export default RequestNew
