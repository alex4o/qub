# qub

A blockchain-based network which connects scientists, producing research, reproducers, validating research and institutions, funding research. The end goal is to both fund research and incentivise its reproduction.

## Installation

### Blockchain setup

From the blockchain folder, run
```bash
npm install
```

Start a development blockchain server via:
```bash
npm run rpc
```

*Take a note of the 12 word password printed after "Mnemonic".*

Publish the Ethereum contract locally via:
```bash
npm run deploy
```

*Warning: if you want to publish the contract again, restart the blockchain server.*

Install the [MetaMask](https://metamask.io/) browser extension and instead of creating a new account, use the "Import Existing Den" option and paste the 12 word password copied from above. Select "Localhost 8545" as the chosen network.

*Warning: if you restart the blockchain server, you need to reset your account state from settings.*

You're good to go on the blockchain side!
