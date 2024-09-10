# Crypto Predictor

Crypto Predictor is a decentralized prediction market platform built on the Axelar network using CosmWasm smart contracts. It allows users to create, participate, and win in various cryptocurrency price prediction markets.

## Features

- Decentralized Markets: Create and participate in fully decentralized prediction markets.
- Blockchain Security: All transactions and predictions are secured on the blockchain.
- Smart Contract Integration: Powered by CosmWasm smart contracts written in Rust for robust backend operations.
- User-Friendly Interface: Built with React and Vite for a smooth and responsive user experience.

## Project Structure

- `smart-contract/`: CosmWasm smart contract
- `deploy/`: Deployment scripts for the smart contract
- `client/`: Frontend React application

## Smart Contract

### Prerequisites

- Rust 1.58.1+
- `wasm32-unknown-unknown` target
- [cargo-generate](https://github.com/ashleygwilliams/cargo-generate)
- [cargo-run-script](https://github.com/JoshMcguigan/cargo-run-script)

### Building

To build the contract, run:

```sh
cd smart-contract
cargo build --lib --release --target wasm32-unknown-unknown
```

### Testing
Run the unit tests with:

```sh
cargo test
```

### Generating Schema
Generate the JSON schema files with:

```sh
cargo run --bin schema
```

## Deployment
### Prerequisites
1. Node.js
2. npm
3. A .env file with MNEMONIC and RPC variables set
4. The predictor.wasm file in the project root

### Installation

1. Navigate to the deploy directory
2. Install dependencies:
```sh
npm install
```

### Configuration
Create a .env file in the deploy directory with the following content:
```sh
MNEMONIC=your_wallet_mnemonic
RPC=your_rpc_endpoint
```

### Usage
To deploy the contract, run:
```sh
node index.js
```

## Frontend Client
### Setup
1. Navigate to the client directory
2. Install dependencies:
```sh
npm install
```

3. Create a .env file in the client directory with the following variables:
```sh
VITE_MNEMONIC=your_mnemonic_here 
VITE_RPC=your_rpc_endpoint_here
```

4. Start the development server:
```sh
npm run dev
```

### Usage
1. Connect your wallet using the "Connect Wallet" button in the Game component.
2. Navigate to the Bet component to place bets on cryptocurrency price movements.
3. Select a cryptocurrency, enter your bet amount, and choose to bet UP or DOWN.
4. Wait for the round to end and see if you've won!

### Smart Contract Interaction
The useContract hook provides functions to interact with the smart contract:

1. submitPrediction: Submit a new prediction
2. finalizePrediction: Finalize a prediction with the actual price
3. updatePrice: Update the price of a cryptocurrency
4. startRound: Start a new betting round
5. endRound: End a betting round
6. placeBet: Place a bet on a round
7. getPrediction: Get details of a specific prediction

### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

### License
This project is open source and available under the MIT License.