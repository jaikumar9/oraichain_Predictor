# Crypto Predictor

Crypto Predictor is a decentralized prediction market platform built on the Oraichain blockchain. It allows users to create, participate, and win in various prediction markets.

## Features

- Decentralized Markets: Create and participate in fully decentralized prediction markets.
- Blockchain Security: All transactions and predictions are secured on the Oraichain blockchain.
- Smart Contract Integration: Powered by CosmWasm smart contracts written in Rust for robust backend operations.
- User-Friendly Interface: Built with React and Vite for a smooth and responsive user experience.

## Project Structure

- `client/`: Frontend React application
  - `src/`: Source code
    - `components/`: React components (Home, Game, Bet, Footer)
    - `hooks/`: Custom React hooks (useContract)
    - `utils/`: Utility functions (wallet, price)

## Setup

1. Clone the repository
2. Navigate to the `client` directory
3. Install dependencies:
```sh
npm install
```

4. Create a `.env` file in the `client` directory with the following variables:
```sh
VITE_MNEMONIC=your_mnemonic_here 
VITE_RPC=your_rpc_endpoint_here
```

5. Start the development server:
```sh
npm run dev
```

## Usage

1. Connect your wallet using the "Connect Wallet" button in the Game component.
2. Navigate to the Bet component to place bets on cryptocurrency price movements.
3. Select a cryptocurrency, enter your bet amount, and choose to bet UP or DOWN.
4. Wait for the round to end and see if you've won!

## Smart Contract Interaction

The `useContract` hook provides functions to interact with the smart contract:

- `submitPrediction`: Submit a new prediction
- `finalizePrediction`: Finalize a prediction with the actual price
- `updatePrice`: Update the price of a cryptocurrency
- `startRound`: Start a new betting round
- `endRound`: End a betting round
- `placeBet`: Place a bet on a round
- `getPrediction`: Get details of a specific prediction

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).