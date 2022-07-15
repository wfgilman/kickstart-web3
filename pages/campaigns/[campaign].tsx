import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

interface Props {
  address: string,
  minimumContribution: int,
  balance: int,
  requestCount: int,
  approversCount: int,
  manager: string
}

class CampaignShow extends Component<Props> {
  static async getInitialProps(context) {
    const address = context.query.campaign;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();

    return {
      address: context.query.campaign,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards() {
    const {
      address,
      minimumContribution,
      balance,
      requestCount,
      approversCount,
      manager
    } = this.props

    const items = [
      {
        header: manager,
        meta: 'Account Manager',
        description: 'This is the creator of the campaign and can request funds to withdraw',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description: 'You must contribute this much Wei to become an approver'
      },
      {
        header: requestCount,
        meta: 'Request Count',
        description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description: 'Number of people who have donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'The balance is how much the campaign has left to spend'
      }
    ]

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout title='Campaign'>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              {this.renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Button
                href={`/campaigns/${this.props.address}/requests`}
                primary
              >View Requests</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
