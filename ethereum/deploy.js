const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
const factoryJson = JSON.parse(compiledFactory);

console.log(`Your secret mnemonic phrase is: ${process.env.SECRET_PHRASE}`)
console.log(`Your proverider URL is: ${process.env.PROVIDER_URL}`)

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: process.env.SECRET_PHRASE
  },
  providerOrUrl: process.env.PROVIDER_URL
});
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(factoryJson.abi)
    .deploy({ data: factoryJson.evm.bytecode.object })
    .send({ gas: '3000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();
