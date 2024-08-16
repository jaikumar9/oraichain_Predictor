use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Addr, Coin};
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

pub const STATE: Item<State> = Item::new("state");
pub const PREDICTIONS: Map<u64, Prediction> = Map::new("predictions");
