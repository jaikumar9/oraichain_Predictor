use cosmwasm_std::{
    entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult, Addr, Coin,
};
use cw2::set_contract_version;
use crate::error::ContractError;
use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg, PredictionResponse};
use crate::state::{Prediction, State, STATE, PREDICTIONS};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:crypto-predictor";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
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
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::SubmitPrediction { symbol, prediction, bet_amount } => {
            execute::submit_prediction(deps, info, symbol, prediction, bet_amount)
        }
        ExecuteMsg::FinalizePrediction { prediction_id, actual_price } => {
            execute::finalize_prediction(deps, info, prediction_id, actual_price)
        }
    }
}

pub mod execute {
    use super::*;
    
    pub fn submit_prediction(
        deps: DepsMut,
        info: MessageInfo,
        symbol: String,
        prediction: i64,  // price prediction in cents
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
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetPrediction { prediction_id } => to_binary(&query::get_prediction(deps, prediction_id)?),
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

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_binary};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies();

        let msg = InstantiateMsg {};
        let info = mock_info("creator", &coins(1000, "earth"));

        let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());
    }

    #[test]
    fn submit_prediction() {
        let mut deps = mock_dependencies();

        let instantiate_msg = InstantiateMsg {};
        let info = mock_info("creator", &coins(1000, "earth"));
        let _res = instantiate(deps.as_mut(), mock_env(), info, instantiate_msg).unwrap();

        let prediction_msg = ExecuteMsg::SubmitPrediction {
            symbol: "BTC".to_string(),
            prediction: 5000000,
            bet_amount: coins(10, "token")[0].clone(),
        };

        let info = mock_info("predictor", &coins(10, "token"));
        let res = execute(deps.as_mut(), mock_env(), info, prediction_msg).unwrap();
        assert_eq!(0, res.messages.len());

        let query_msg = QueryMsg::GetPrediction { prediction_id: 1 };
        let bin = query(deps.as_ref(), mock_env(), query_msg).unwrap();
        let prediction: PredictionResponse = from_binary(&bin).unwrap();
        assert_eq!(prediction.id, 1);
        assert_eq!(prediction.symbol, "BTC");
        assert_eq!(prediction.prediction, 5000000);
    }

    #[test]
    fn finalize_prediction() {
        let mut deps = mock_dependencies();

        let instantiate_msg = InstantiateMsg {};
        let info = mock_info("creator", &coins(1000, "earth"));
        let _res = instantiate(deps.as_mut(), mock_env(), info, instantiate_msg).unwrap();

        let prediction_msg = ExecuteMsg::SubmitPrediction {
            symbol: "BTC".to_string(),
            prediction: 5000000,
            bet_amount: coins(10, "token")[0].clone(),
        };

        let info = mock_info("predictor", &coins(10, "token"));
        let _res = execute(deps.as_mut(), mock_env(), info, prediction_msg).unwrap();

        let finalize_msg = ExecuteMsg::FinalizePrediction {
            prediction_id: 1,
            actual_price: 4900000,
        };

        let info = mock_info("predictor", &coins(10, "token"));
        let res = execute(deps.as_mut(), mock_env(), info, finalize_msg).unwrap();
        assert_eq!(0, res.messages.len());
    }
}
