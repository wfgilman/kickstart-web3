import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory).abi,
  '0xb0615EC7f5D71234c99f7eAFD21d58e54E64614A'
);

export default instance;
