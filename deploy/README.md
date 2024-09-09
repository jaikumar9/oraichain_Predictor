# Crypto Predictor Contract Deployment

This project deploys a Crypto Predictor smart contract to the Axelar network using CosmWasm.

## Prerequisites

- Node.js
- npm
- A `.env` file with `MNEMONIC` and `RPC` variables set
- The `predictor.wasm` file in the project root

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Configuration
Create a .env file in the project root with the following content:

```sh
MNEMONIC=your_wallet_mnemonic
RPC=axelar_rpc_endpoint
```

### Usage

To deploy the contract, run:

```sh
node index.js
```

This script will:

1. Set up a wallet using the provided mnemonic
2. Connect to the Axelar blockchain
3. Upload the contract WASM code
4. Instantiate the contract

### Dependencies
1. @cosmjs/cosmwasm-stargate
2. @cosmjs/launchpad
3. @cosmjs/proto-signing
4. @cosmjs/stargate
5. dotenv


### License
This project is licensed under the ISC License.