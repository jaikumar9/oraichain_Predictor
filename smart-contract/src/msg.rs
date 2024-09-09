use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Addr, Coin, Uint128};

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    SubmitPrediction { symbol: String, prediction: i64, bet_amount: Coin },
    FinalizePrediction { prediction_id: u64, actual_price: i64 },
    UpdatePrice { symbol: String, new_price: Uint128 },
    StartRound { symbol: String, start_price: Uint128 },
    EndRound { round_id: u64, end_price: Uint128 },
    PlaceBet { round_id: u64, direction: BetDirection, amount: Uint128 },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(PredictionResponse)]
    GetPrediction { prediction_id: u64 },
}

#[cw_serde]
#[derive(Eq)]
pub enum BetDirection {
    Up,
    Down,
}

#[cw_serde]
pub struct PredictionResponse {
    pub id: u64,
    pub symbol: String,
    pub predictor: Addr,
    pub prediction: i64,
    pub bet_amount: Coin,
    pub finalized: bool,
    pub actual_price: Option<i64>,
}