import {
    CosmWasmClient,
    SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import {
    SigningStargateClient,
    StargateClient,
    GasPrice,
} from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess } from "@cosmjs/stargate";
import { useState, useEffect } from "react";
//require('dotenv').config();

const mnemonic = import.meta.env.VITE_MNEMONIC;
const rpcEndpoint = import.meta.env.VITE_RPC;
const prefix = "orai";
const contractAddress = "your_contract_address_here"; // Replace with your actual contract address

export function useContract() {
    const [client, setClient] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        async function connect() {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
                mnemonic,
                { prefix }
            );
            const [{ address }] = await wallet.getAccounts();
            const client = await SigningCosmWasmClient.connectWithSigner(
                rpcEndpoint,
                wallet,
                {
                    gasPrice: GasPrice.fromString("0.0025orai"),
                }
            );
            setClient(client);
            setAddress(address);
        }
        connect();
    }, []);

    async function submitPrediction(symbol, prediction, betAmount) {
        if (!client || !address) return;
        const msg = {
            submit_prediction: { symbol, prediction, bet_amount: betAmount },
        };
        const result = await client.execute(
            address,
            contractAddress,
            msg,
            "auto"
        );
        assertIsBroadcastTxSuccess(result);
        return result;
    }

    async function finalizePrediction(predictionId, actualPrice) {
        if (!client || !address) return;
        const msg = {
            finalize_prediction: {
                prediction_id: predictionId,
                actual_price: actualPrice,
            },
        };
        const result = await client.execute(
            address,
            contractAddress,
            msg,
            "auto"
        );
        assertIsBroadcastTxSuccess(result);
        return result;
    }

    async function updatePrice(symbol, newPrice) {
        if (!client || !address) return;
        const msg = { update_price: { symbol, new_price: newPrice } };
        const result = await client.execute(
            address,
            contractAddress,
            msg,
            "auto"
        );
        assertIsBroadcastTxSuccess(result);
        return result;
    }

    async function startRound(symbol, startPrice) {
        if (!client || !address) return;
        const msg = { start_round: { symbol, start_price: startPrice } };
        const result = await client.execute(
            address,
            contractAddress,
            msg,
            "auto"
        );
        assertIsBroadcastTxSuccess(result);
        return result;
    }

    async function endRound(roundId, endPrice) {
        if (!client || !address) return;
        const msg = { end_round: { round_id: roundId, end_price: endPrice } };
        const result = await client.execute(
            address,
            contractAddress,
            msg,
            "auto"
        );
        assertIsBroadcastTxSuccess(result);
        return result;
    }

    async function placeBet(roundId, direction, amount) {
        if (!client || !address) return;
        const msg = { place_bet: { round_id: roundId, direction, amount } };
        const result = await client.execute(
            address,
            contractAddress,
            msg,
            "auto",
            undefined,
            [{ denom: "orai", amount: amount }]
        );
        assertIsBroadcastTxSuccess(result);
        return result;
    }

    async function getPrediction(predictionId) {
        if (!client) return;
        const result = await client.queryContractSmart(contractAddress, {
            get_prediction: { prediction_id: predictionId },
        });
        return result;
    }

    return {
        address,
        submitPrediction,
        finalizePrediction,
        updatePrice,
        startRound,
        endRound,
        placeBet,
        getPrediction,
    };
}
