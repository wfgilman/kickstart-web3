import React from 'react';
import { Menu } from 'semantic-ui-react';
import Router from 'next/router';

const M = () => {

  return (
    <Menu style={{ marginTop: '10px' }}>
      <Menu.Item href='/'>CrowdCoin</Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item href='/'>Campaigns</Menu.Item>
        <Menu.Item href='/campaigns/new'>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default M;
