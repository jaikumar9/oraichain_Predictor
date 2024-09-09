# Crypto Predictor Smart Contract

This smart contract, built on CosmWasm, allows users to make predictions on cryptocurrency prices and participate in betting rounds.

## Features

- Submit price predictions for various cryptocurrencies
- Finalize predictions with actual prices
- Start and end betting rounds
- Place bets on price movements (up or down)
- Query prediction details

## Getting Started

### Prerequisites

- Rust 1.58.1+
- `wasm32-unknown-unknown` target
- [cargo-generate](https://github.com/ashleygwilliams/cargo-generate)
- [cargo-run-script](https://github.com/JoshMcguigan/cargo-run-script)

### Building

To build the contract, run:

```sh
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

### Usage
1. Instantiate the contract
2. Submit predictions using SubmitPrediction
3. Start rounds with StartRound
4. Place bets using PlaceBet
5. End rounds and distribute prizes with EndRound
6. Query prediction details using GetPrediction


### License
This project is licensed under [LICENSE_NAME]. See the LICENSE file for details.

### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.