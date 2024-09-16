import { useState, useEffect } from "react";
import {
    CosmWasmClient,
    SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";
import { assertIsDeliverTxSuccess, DeliverTxResponse } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
    CryptoPredictorQueryClient,
    CryptoPredictorClient,
} from "../contracts/CryptoPredictor.client";
import { BetDirection } from "../contracts/CryptoPredictor.types";
// @ts-ignore
import { data, PriceData } from "../utils/price";

const mnemonic = import.meta.env.VITE_MNEMONIC;
const rpcEndpoint = import.meta.env.VITE_RPC;
const prefix = "osmo";
const contractAddress =
    "osmo1evh5yjgt7je4h26yfc0qa4s0cfq7dm8llew22czskfvrluh6m0qsgqheft";

async function getCosmWasmClient(rpcEndpoint: string): Promise<CosmWasmClient> {
    return await CosmWasmClient.connect(rpcEndpoint);
}

async function getSigningCosmWasmClient(
    rpcEndpoint: string,
    mnemonic: string,
    prefix: string
): Promise<SigningCosmWasmClient> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix,
    });
    return await SigningCosmWasmClient.connectWithSigner(rpcEndpoint, wallet, {
        gasPrice: GasPrice.fromString("0.1uosmo"),
    });
}

export function useContract() {
    const [client, setClient] = useState<SigningCosmWasmClient | null>(null);
    const [queryClient, setQueryClient] =
        useState<CryptoPredictorQueryClient | null>(null);
    const [address, setAddress] = useState<string | null>(null);

    useEffect(() => {
        async function connect() {
            const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
                mnemonic,
                { prefix }
            );
            const [{ address }] = await wallet.getAccounts();
            const signingClient = await getSigningCosmWasmClient(
                rpcEndpoint,
                mnemonic,
                prefix
            );
            const cosmWasmClient = await getCosmWasmClient(rpcEndpoint);

            setClient(signingClient);
            setAddress(address);
            setQueryClient(
                new CryptoPredictorQueryClient(cosmWasmClient, contractAddress)
            );
        }
        connect();
    }, []);

    async function getBalance(): Promise<string> {
        if (!client || !address) return "0";
        const balance = await client.getBalance(address, "uosmo");
        return balance.amount;
    }

    async function submitPrediction(
        symbol: string,
        prediction: number,
        betAmount: string
    ) {
        if (!client || !address) return;
        const cryptoPredictor = new CryptoPredictorClient(
            client,
            address,
            contractAddress
        );
        const result = await cryptoPredictor.submitPrediction({
            symbol,
            prediction,
            betAmount: { amount: betAmount, denom: "uosmo" },
        });
        assertIsDeliverTxSuccess(result as unknown as DeliverTxResponse);
        return result;
    }

    async function finalizePrediction(
        predictionId: number,
        actualPrice: number
    ) {
        if (!client || !address) return;
        const cryptoPredictor = new CryptoPredictorClient(
            client,
            address,
            contractAddress
        );
        const result = await cryptoPredictor.finalizePrediction({
            predictionId,
            actualPrice,
        });
        assertIsDeliverTxSuccess(result as unknown as DeliverTxResponse);
        return result;
    }

    async function updatePrice(symbol: string, newPrice: number) {
        if (!client || !address) return;
        const cryptoPredictor = new CryptoPredictorClient(
            client,
            address,
            contractAddress
        );
        const result = await cryptoPredictor.updatePrice({
            symbol,
            newPrice: newPrice.toString(),
        });
        assertIsDeliverTxSuccess(result as unknown as DeliverTxResponse);
        return result;
    }

    async function startRound(symbol: string, startPrice: number) {
        if (!client || !address) return;
        const cryptoPredictor = new CryptoPredictorClient(
            client,
            address,
            contractAddress
        );
        const result = await cryptoPredictor.startRound({
            symbol,
            startPrice: startPrice.toString(),
        });
        assertIsDeliverTxSuccess(result as unknown as DeliverTxResponse);
        return result;
    }

    async function endRound(roundId: number) {
        if (!client || !address) return;
        const cryptoPredictor = new CryptoPredictorClient(
            client,
            address,
            contractAddress
        );
        const symbol = data[0].name;
        const currentPrice =
            data.find((item: PriceData) => item.name === symbol)?.price || 0;
        const result = await cryptoPredictor.endRound({
            roundId,
            endPrice: currentPrice.toString(),
        });
        assertIsDeliverTxSuccess(result as unknown as DeliverTxResponse);
        return result;
    }

    async function placeBet(
        roundId: number,
        direction: BetDirection,
        amount: string
    ) {
        if (!client || !address) {
            console.error("Client or address not initialized");
            return;
        }
        if (roundId <= 0) {
            console.error("Invalid roundId");
            return;
        }
        try {
            const cryptoPredictor = new CryptoPredictorClient(
                client,
                address,
                contractAddress
            );
            const result = await cryptoPredictor.placeBet(
                { roundId, direction, amount },
                "auto",
                undefined,
                [{ denom: "uosmo", amount }]
            );
            assertIsDeliverTxSuccess(result as unknown as DeliverTxResponse);
            return result;
        } catch (error) {
            console.error("Error in placeBet:", error);
            throw error;
        }
    }

    async function getPrediction(predictionId: number) {
        if (!queryClient) return;
        return await queryClient.getPrediction({ predictionId });
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
        getBalance,
        useContract,
    };
}
