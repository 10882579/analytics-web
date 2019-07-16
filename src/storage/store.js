import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import home from "./reducers/home";
import account from "./reducers/account";

const reducer = combineReducers(
  {
    home: home,
    account: account
  }
)

const store = createStore(reducer, applyMiddleware(thunk))

export default store
