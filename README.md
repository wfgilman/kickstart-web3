# Kickstarter Clone
Web3/Crypto/Ethereum/Blockchain sample project

Built with the [Ethereum and Solidity: The Complete Developer's Guild](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/) course on Udemy cited on the [DeFi-Developer-Road-Map](https://github.com/OffcierCia/DeFi-Developer-Road-Map)

### Technology
- Solidity 0.8
- Next.js
- Typescript
- [HDWallet](https://github.com/trufflesuite/truffle-hdwallet-provider)
- [Web3.js](https://github.com/ChainSafe/web3.js)
- [Infura](https://infura.io/)
- MetaMask

### Running Locally
1. Export your MetaMask mnemonic phase to an environment variable `SECRET_PHRASE`
```
export SECRET_PHRASE="lazy brown fox ..."
```
2. Export your Infura project's Rinkeby url to the environment variable `PROVIDER_URL`
```
export PROVIDER_URL="https://rinkeby.infura.io/v3/abcdefg"
```
3. Compile and Deploy the Solidity contract to the Rinkeby test network
```
$ cd ethereum
$ node compile.js
$ node deploy.js
```
4. Copy the deployed factory address and add it to the `ethereum/factory.js` file
5. Start the web server
```
$ npm run dev
```
6. View the website on `http:localhost:3000`
