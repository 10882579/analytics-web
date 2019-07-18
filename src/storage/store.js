import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import home from "./reducers/home";
import account from "./reducers/account";
import contractor from "./reducers/contractor";
import mode from "./reducers/mode";

const reducer = combineReducers(
  {
    home: home,
    account: account,
    contractor: contractor,
    mode: mode
  }
)

const store = createStore(reducer, applyMiddleware(thunk))

export default store
