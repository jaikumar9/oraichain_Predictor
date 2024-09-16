/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { MsgExecuteContractEncodeObject } from "@cosmjs/cosmwasm-stargate";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { toUtf8 } from "@cosmjs/encoding";
import { InstantiateMsg, ExecuteMsg, Uint128, BetDirection, Coin, QueryMsg, Addr, PredictionResponse } from "./CryptoPredictor.types";
export interface CryptoPredictorMsg {
  contractAddress: string;
  sender: string;
  submitPrediction: ({
    betAmount,
    prediction,
    symbol
  }: {
    betAmount: Coin;
    prediction: number;
    symbol: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  finalizePrediction: ({
    actualPrice,
    predictionId
  }: {
    actualPrice: number;
    predictionId: number;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  updatePrice: ({
    newPrice,
    symbol
  }: {
    newPrice: Uint128;
    symbol: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  startRound: ({
    startPrice,
    symbol
  }: {
    startPrice: Uint128;
    symbol: string;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  endRound: ({
    endPrice,
    roundId
  }: {
    endPrice: Uint128;
    roundId: number;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
  placeBet: ({
    amount,
    direction,
    roundId
  }: {
    amount: Uint128;
    direction: BetDirection;
    roundId: number;
  }, _funds?: Coin[]) => MsgExecuteContractEncodeObject;
}
export class CryptoPredictorMsgComposer implements CryptoPredictorMsg {
  sender: string;
  contractAddress: string;
  constructor(sender: string, contractAddress: string) {
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.submitPrediction = this.submitPrediction.bind(this);
    this.finalizePrediction = this.finalizePrediction.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.startRound = this.startRound.bind(this);
    this.endRound = this.endRound.bind(this);
    this.placeBet = this.placeBet.bind(this);
  }
  submitPrediction = ({
    betAmount,
    prediction,
    symbol
  }: {
    betAmount: Coin;
    prediction: number;
    symbol: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          submit_prediction: {
            bet_amount: betAmount,
            prediction,
            symbol
          }
        })),
        funds: _funds
      })
    };
  };
  finalizePrediction = ({
    actualPrice,
    predictionId
  }: {
    actualPrice: number;
    predictionId: number;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          finalize_prediction: {
            actual_price: actualPrice,
            prediction_id: predictionId
          }
        })),
        funds: _funds
      })
    };
  };
  updatePrice = ({
    newPrice,
    symbol
  }: {
    newPrice: Uint128;
    symbol: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          update_price: {
            new_price: newPrice,
            symbol
          }
        })),
        funds: _funds
      })
    };
  };
  startRound = ({
    startPrice,
    symbol
  }: {
    startPrice: Uint128;
    symbol: string;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          start_round: {
            start_price: startPrice,
            symbol
          }
        })),
        funds: _funds
      })
    };
  };
  endRound = ({
    endPrice,
    roundId
  }: {
    endPrice: Uint128;
    roundId: number;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          end_round: {
            end_price: endPrice,
            round_id: roundId
          }
        })),
        funds: _funds
      })
    };
  };
  placeBet = ({
    amount,
    direction,
    roundId
  }: {
    amount: Uint128;
    direction: BetDirection;
    roundId: number;
  }, _funds?: Coin[]): MsgExecuteContractEncodeObject => {
    return {
      typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
      value: MsgExecuteContract.fromPartial({
        sender: this.sender,
        contract: this.contractAddress,
        msg: toUtf8(JSON.stringify({
          place_bet: {
            amount,
            direction,
            round_id: roundId
          }
        })),
        funds: _funds
      })
    };
  };
}