# Oraichain Predictor

This project is a decentralized application (dApp) built on the Oraichain blockchain, which combines React for the frontend and CosmWasm smart contracts written in Rust for the backend.

## Overview

The Oraichain Predictor dApp allows users to create and participate in prediction markets. Users can create new prediction markets by deploying smart contracts, and other users can then interact with these contracts to place bets on the outcomes of various events.

The frontend is built with React and Vite, providing a modern and efficient development environment. The backend consists of CosmWasm smart contracts written in Rust, which are deployed and executed on the Oraichain blockchain.

## Folder Structure

- `smart-contract/`: This directory contains the Rust source code for the CosmWasm smart contracts that power the prediction markets.
- `src/`: This directory contains the React source code for the frontend application.

## Getting Started

To get started with the project, follow these steps:

1. Install the required dependencies:
   - Rust and Cargo (for smart contract development)
   - Node.js and npm (for frontend development)

2. Build and deploy the smart contracts:
   - Follow the instructions in the `smart-contract/README.md` file to compile and deploy the smart contracts to the Oraichain blockchain.

3. Start the frontend development server:
   - Navigate to the `src/` directory.
   - Run `npm install` to install the frontend dependencies.
   - Run `npm run dev` to start the Vite development server.

4. Access the application by visiting `http://localhost:3000` in your web browser.

## Contributing

Contributions to the Oraichain Predictor project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the project's GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).