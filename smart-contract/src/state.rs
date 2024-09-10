use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, Coin, Uint128};
use cw_storage_plus::{Item, Map};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct State {
    pub owner: Addr,
    pub total_predictions: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Prediction {
    pub id: u64,
    pub symbol: String,
    pub predictor: Addr,
    pub prediction: i64,
    pub bet_amount: Coin,
    pub finalized: bool,
    pub actual_price: Option<i64>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Round {
    pub id: u64,
    pub symbol: String,
    pub start_price: Uint128,
    pub end_price: Option<Uint128>,
    pub start_time: u64,
    pub end_time: Option<u64>,
    pub total_up_bets: Uint128,
    pub total_down_bets: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct Bet {
    pub round_id: u64,
    pub bettor: Addr,
    pub direction: crate::msg::BetDirection,
    pub amount: Uint128,
}

pub const BETS: Map<(u64, Addr), Bet> = Map::new("bets");
pub const ROUNDS: Map<u64, Round> = Map::new("rounds");
pub const CURRENT_ROUND: Item<u64> = Item::new("current_round");
pub const STATE: Item<State> = Item::new("state");
pub const PREDICTIONS: Map<u64, Prediction> = Map::new("predictions");
pub const PRICES: Map<&str, Uint128> = Map::new("prices");
