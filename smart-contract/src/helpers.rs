<<<<<<< HEAD
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cosmwasm_std::{to_json_binary, Addr, CosmosMsg, StdResult, WasmMsg};
=======
use cosmwasm_std::{to_json_binary, Addr, CosmosMsg, StdResult, WasmMsg};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
>>>>>>> ad1779e138ae6b6e2f8b8729473b8d793121466e

use crate::msg::ExecuteMsg;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
pub struct CwTemplateContract(pub Addr);

impl CwTemplateContract {
    pub fn addr(&self) -> Addr {
        self.0.clone()
    }

    pub fn call<T: Into<ExecuteMsg>>(&self, msg: T) -> StdResult<CosmosMsg> {
        let msg = to_json_binary(&msg.into())?;
        Ok(WasmMsg::Execute {
            contract_addr: self.addr().into(),
            msg,
            funds: vec![],
        }
        .into())
    }
}
