/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {}
export type ExecuteMsg = {
  submit_prediction: {
    bet_amount: Coin;
    prediction: number;
    symbol: string;
  };
} | {
  finalize_prediction: {
    actual_price: number;
    prediction_id: number;
  };
} | {
  update_price: {
    new_price: Uint128;
    symbol: string;
  };
} | {
  start_round: {
    start_price: Uint128;
    symbol: string;
  };
} | {
  end_round: {
    end_price: Uint128;
    round_id: number;
  };
} | {
  place_bet: {
    amount: Uint128;
    direction: BetDirection;
    round_id: number;
  };
};
export type Uint128 = string;
export type BetDirection = "up" | "down";
export interface Coin {
  amount: Uint128;
  denom: string;
}
export type QueryMsg = {
  get_prediction: {
    prediction_id: number;
  };
};
export type Addr = string;
export interface PredictionResponse {
  actual_price?: number | null;
  bet_amount: Coin;
  finalized: boolean;
  id: number;
  prediction: number;
  predictor: Addr;
  symbol: string;
}