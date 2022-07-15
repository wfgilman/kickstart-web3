import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import Link from 'next/link';

interface Props {
  campaigns: [string]
};

class CampaignIndex extends Component<Props> {
  static async getInitialProps() {
    const campaigns = await factory.methods.getCampaigns().call();

    return { campaigns: campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout title='Home Page'>
      <div>
        <h3>Open Campaigns</h3>
        <Button href='/campaigns/new' floated='right' content='Create Campaign' icon='add circle' primary />
        {this.renderCampaigns()}
      </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
