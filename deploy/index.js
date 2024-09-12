const { DirectSecp256k1HdWallet } = require('@cosmjs/proto-signing');
const { SigningCosmWasmClient } = require('@cosmjs/cosmwasm-stargate');
const { GasPrice } = require('@cosmjs/stargate');
const fs = require('fs');
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const rpcEndpoint = process.env.RPC;
const contractWasmPath = "./predictor.wasm";

async function deploy() {
  // Step 1: Set up wallet and client
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "osmo", // Change it to the preferred chain's prefix of wallet address
  });
  const [account] = await wallet.getAccounts();
  console.log(`Wallet address: ${account.address}`);

  // Step 2: Connect to the blockchain
  const client = await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, { gasPrice: GasPrice.fromString('0.025osmo')}); // Change it to the preferred chain's prefix of native token name
  console.log("Connected to blockchain");

  // Step 3: Upload contract 
  const wasmCode = fs.readFileSync(contractWasmPath);
  const uploadReceipt = await client.upload(account.address, wasmCode, "auto", "Upload Predictor contract");
  const codeId = uploadReceipt.codeId;
  console.log(`Contract uploaded with Code ID: ${codeId}`);

  // Step 4: Instantiate contract
  const initMsg = {}; // Empty init message as per the contract's InstantiateMsg
  const instantiateReceipt = await client.instantiate(account.address, codeId, initMsg, "Crypto Predictor Contract", "auto");
  const contractAddress = instantiateReceipt.contractAddress;
  console.log(`Contract instantiated at receipt: ${JSON.stringify(instantiateReceipt)}`);
  console.log(`Contract instantiated at address: ${contractAddress}`);
}

deploy().catch(console.error);
