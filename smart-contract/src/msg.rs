use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::{Addr, Coin};

#[cw_serde]
pub struct InstantiateMsg {}

#[cw_serde]
pub enum ExecuteMsg {
    SubmitPrediction { symbol: String, prediction: i64, bet_amount: Coin },
    FinalizePrediction { prediction_id: u64, actual_price: i64 },
}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(PredictionResponse)]
    GetPrediction { prediction_id: u64 },
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
