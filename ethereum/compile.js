const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');

// Delete build
fs.removeSync(buildPath);

const fileName = 'Campaign.sol';
const campaignPath = path.resolve(__dirname, 'contracts', fileName);
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[fileName];

// Create build folder
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    JSON.stringify(output[contract])
  );
  // console.log(JSON.stringify(output[contract]));
}
