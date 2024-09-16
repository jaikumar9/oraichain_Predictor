use cosmwasm_std::{
    entry_point, to_json_binary, Addr, Binary, Coin, Deps, DepsMut, Env, MessageInfo, Response,
    StdResult, Uint128,
};

use crate::error::ContractError;
use crate::msg::{BetDirection, ExecuteMsg, InstantiateMsg, PredictionResponse, QueryMsg};
use crate::state::{
    Bet, Prediction, Round, State, BETS, CURRENT_ROUND, PREDICTIONS, PRICES, ROUNDS, STATE,
};
use cosmwasm_std::Order;
use cw2::set_contract_version;

const CONTRACT_NAME: &str = "crates.io:crypto-predictor";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let state = State {
        owner: info.sender.clone(),
        total_predictions: 0,
    };
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    STATE.save(deps.storage, &state)?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender))
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::SubmitPrediction {
            symbol,
            prediction,
            bet_amount,
        } => execute::submit_prediction(deps, info, symbol, prediction, bet_amount),
        ExecuteMsg::FinalizePrediction {
            prediction_id,
            actual_price,
        } => execute::finalize_prediction(deps, info, prediction_id, actual_price),
        ExecuteMsg::StartRound {
            symbol,
            start_price,
        } => execute::start_round(deps, env, info, symbol, start_price),
        ExecuteMsg::EndRound { round_id } => execute::end_round(deps, env, info, round_id),
        ExecuteMsg::PlaceBet {
            round_id,
            direction,
            amount,
        } => execute::place_bet(deps, env, info, round_id, direction, amount),
        ExecuteMsg::UpdatePrice { symbol, new_price } => {
            execute::update_price(deps, env, info, symbol, new_price)
        }
    }
}

pub mod execute {
    use super::*;

    pub fn submit_prediction(
        deps: DepsMut,
        info: MessageInfo,
        symbol: String,
        prediction: i64, // price prediction in cents
        bet_amount: Coin,
    ) -> Result<Response, ContractError> {
        let state = STATE.load(deps.storage)?;
        let prediction_id = state.total_predictions + 1;

        let new_prediction = Prediction {
            id: prediction_id,
            symbol: symbol.clone(),
            predictor: info.sender.clone(),
            prediction,
            bet_amount,
            finalized: false,
            actual_price: None,
        };

        PREDICTIONS.save(deps.storage, prediction_id, &new_prediction)?;

        // Update total predictions
        STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
            state.total_predictions += 1;
            Ok(state)
        })?;

        Ok(Response::new()
            .add_attribute("action", "submit_prediction")
            .add_attribute("symbol", symbol)
            .add_attribute("prediction_id", prediction_id.to_string()))
    }

    pub fn finalize_prediction(
        deps: DepsMut,
        info: MessageInfo,
        prediction_id: u64,
        actual_price: i64,
    ) -> Result<Response, ContractError> {
        let mut prediction = PREDICTIONS.load(deps.storage, prediction_id)?;

        if prediction.finalized {
            return Err(ContractError::AlreadyFinalized {});
        }

        if info.sender != prediction.predictor {
            return Err(ContractError::Unauthorized {});
        }

        prediction.actual_price = Some(actual_price);
        prediction.finalized = true;
        PREDICTIONS.save(deps.storage, prediction_id, &prediction)?;

        Ok(Response::new()
            .add_attribute("action", "finalize_prediction")
            .add_attribute("prediction_id", prediction_id.to_string())
            .add_attribute("actual_price", actual_price.to_string()))
    }

    pub fn update_price(
        deps: DepsMut,
        _env: Env,
        info: MessageInfo,
        symbol: String,
        new_price: Uint128,
    ) -> Result<Response, ContractError> {
        if !is_authorized(deps.as_ref(), &info.sender) {
            return Err(ContractError::Unauthorized {});
        }

        PRICES.save(deps.storage, &symbol, &new_price)?;

        Ok(Response::new()
            .add_attribute("action", "update_price")
            .add_attribute("symbol", symbol)
            .add_attribute("new_price", new_price.to_string()))
    }

    pub fn start_round(
        deps: DepsMut,
        env: Env,
        info: MessageInfo,
        symbol: String,
        start_price: Uint128,
    ) -> Result<Response, ContractError> {
        // Check if the sender is authorized to start a round
        if !is_authorized(deps.as_ref(), &info.sender) {
            return Err(ContractError::Unauthorized {});
        }

        let mut state = STATE.load(deps.storage)?;
        let round_id = state.total_predictions + 1;

        let new_round = Round {
            id: round_id,
            symbol: symbol.clone(),
            start_price,
            end_price: None,
            start_time: env.block.time.seconds(),
            end_time: None,
            total_up_bets: Uint128::zero(),
            total_down_bets: Uint128::zero(),
        };

        ROUNDS.save(deps.storage, round_id, &new_round)?;
        CURRENT_ROUND.save(deps.storage, &round_id)?;

        state.total_predictions += 1;
        STATE.save(deps.storage, &state)?;

        Ok(Response::new()
            .add_attribute("action", "start_round")
            .add_attribute("round_id", round_id.to_string())
            .add_attribute("symbol", symbol)
            .add_attribute("start_price", start_price.to_string()))
    }

    pub fn end_round(
        deps: DepsMut,
        _env: Env,
        _info: MessageInfo,
        round_id: u64,
    ) -> Result<Response, ContractError> {
        let round: Round = ROUNDS.load(deps.storage, round_id)?;
        let current_price = PRICES.load(deps.storage, &round.symbol)?;

        let winning_direction = if current_price > round.start_price {
            BetDirection::Up
        } else {
            BetDirection::Down
        };

        // Distribute rewards
        let mut total_rewards: Uint128 = Uint128::zero();
        BETS.prefix(round_id)
            .range(deps.storage, None, None, Order::Ascending)
            .for_each(|bet: Result<(Addr, Bet), cosmwasm_std::StdError>| {
                let (_, bet) = bet.unwrap();
                if bet.direction == winning_direction {
                    // Calculate and distribute reward
                    let reward: Uint128 = bet.amount * Uint128::from(2u128); // Simple 1:1 payout
                    total_rewards += reward;
                    // Send reward to bettor (implementation needed)
                }
            });

        Ok(Response::new()
            .add_attribute("action", "end_round")
            .add_attribute("round_id", round_id.to_string())
            .add_attribute("winning_direction", format!("{:?}", winning_direction))
            .add_attribute("total_rewards", total_rewards.to_string()))
    }

    pub fn place_bet(
        deps: DepsMut,
        _env: Env,
        info: MessageInfo,
        round_id: u64,
        direction: BetDirection,
        amount: Uint128,
    ) -> Result<Response, ContractError> {
        let mut round = ROUNDS.load(deps.storage, round_id)?;
        if amount.is_zero() {
            return Err(ContractError::InvalidFunds {});
        }
        if round.end_time.is_some() {
            return Err(ContractError::AlreadyFinalized {});
        }

        // Ensure the sent funds match the bet amount
        let sent_funds = info
            .funds
            .iter()
            .find(|coin| coin.denom == "token")
            .ok_or(ContractError::InvalidFunds {})?;
        if sent_funds.amount != amount {
            return Err(ContractError::InvalidFunds {});
        }

        if amount.is_zero() {
            return Err(ContractError::InvalidFunds {});
        }

        // Update round bets
        match direction {
            BetDirection::Up => round.total_up_bets += amount,
            BetDirection::Down => round.total_down_bets += amount,
        }
        ROUNDS.save(deps.storage, round_id, &round)?;

        // Save the individual bet
        let bet = Bet {
            round_id,
            bettor: info.sender.clone(),
            direction: direction.clone(),
            amount,
        };
        BETS.save(deps.storage, (round_id, info.sender.clone()), &bet)?;

        Ok(Response::new()
            .add_attribute("action", "place_bet")
            .add_attribute("round_id", round_id.to_string())
            .add_attribute("bettor", info.sender.to_string())
            .add_attribute("direction", format!("{:?}", direction))
            .add_attribute("amount", amount.to_string()))
    }
}

// Helper function to check if an address is authorized to update prices
fn is_authorized(_deps: Deps, _address: &Addr) -> bool {
    // Implement your authorization logic here
    // For example, you could check against a list of authorized addresses stored in the contract state
    true // Placeholder, replace with actual logic
}
#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetPrediction { prediction_id } => {
            to_json_binary(&query::get_prediction(deps, prediction_id)?)
        }
    }
}

pub mod query {
    use super::*;

    pub fn get_prediction(deps: Deps, prediction_id: u64) -> StdResult<PredictionResponse> {
        let prediction = PREDICTIONS.load(deps.storage, prediction_id)?;
        Ok(PredictionResponse {
            id: prediction.id,
            symbol: prediction.symbol,
            predictor: prediction.predictor,
            prediction: prediction.prediction,
            bet_amount: prediction.bet_amount,
            finalized: prediction.finalized,
            actual_price: prediction.actual_price,
        })
    }
}
