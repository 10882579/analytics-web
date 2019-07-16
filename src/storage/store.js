import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import home from "./reducers/home";
import account from "./reducers/account";
import mode from "./reducers/mode";

const reducer = combineReducers(
  {
    home: home,
    account: account,
    mode: mode
  }
)

const store = createStore(reducer, applyMiddleware(thunk))

export default store
