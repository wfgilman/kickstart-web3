import React, { Component } from 'react'
import { Button, Table } from 'semantic-ui-react'
import Layout from '../../../../components/Layout'
import Campaign from '../../../../ethereum/campaign'
import RequestRow from '../../../../components/RequestRow'


interface Props {
  address: string
  requests: [object],
  requestCount: integer,
  approversCount: integer
}

class RequestIndex extends Component<Props> {
  static async getInitialProps(context) {
    const address = context.query.campaign
    const campaign = Campaign(address)
    const requestCount = await campaign.methods.getRequestCount().call()
    const approversCount = await campaign.methods.approversCount().call()

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return campaign.methods.requests(index).call()
      })
    )

    return {
      address: address,
      requests: requests,
      requestCount: requestCount,
      approversCount: approversCount
    }
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return <RequestRow
        key={index}
        id={index}
        request={request}
        address={this.props.address}
        approversCount={this.props.approversCount}
      />
    })
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table
    return (
      <Layout title='Requests'>
        <h3>Requests</h3>
        <Button
          href={`/campaigns/${this.props.address}/requests/new`}
          floated='right'
          style={{ marginBottom: 10 }}
          primary
        >
          Add Request
        </Button>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount (ether)</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <div>Found {this.props.requestCount} request {this.props.requestCount > 1 ? 's' : ''}</div>
      </Layout>
    )
  }
}

export default RequestIndex
