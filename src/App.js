import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import cookie from 'react-cookies';

import Products from './components/products/index';
import Contractors from './components/contractors/index';
import Contractor from './components/contractorbyid/index';
import Login from './components/account/login';

const ProtectedProductsRoute = ({component: Component,  ...rest}) => (
  <Route {...rest} render={ (props) => (
    rest.loggedIn === true 
      ? <Products {...props} /> 
      : <Redirect to={{
          pathname: "/login/",
          state: { from: props.location }
        }} /> 
  )}/>
)

const ProtectedContractorsRoute = ({component: Component,  ...rest}) => (
  <Route {...rest} render={ (props) => (
    rest.loggedIn === true 
      ? <Contractors {...props} /> 
      : <Redirect to={{
          pathname: "/login/",
          state: { from: props.location }
        }} /> 
  )}/>
)

class App extends React.Component {
  
  logout = async () => {
    await cookie.remove("token", { path: '/' });
    this.props.logout()
  }

  render(){
    const { account } = this.props;
    
    return (
      <Router>
        {
          account.loggedIn ? (
            <div>
              <li>
                <Link to="/products/">Products</Link>
              </li>
              <li>
                <Link to="/contractors/">Contractors</Link>
              </li>
              <li>
                <button onClick={ this.logout }>Log out</button>
              </li>
            </div>
          ) : null
        }


        <Switch>
          <Route path='/login/' exact component={Login} />
          <ProtectedProductsRoute path='/products/' exact component={Products} loggedIn={account.loggedIn}/>
          <ProtectedContractorsRoute path='/contractors/' exact component={Contractors} loggedIn={account.loggedIn}/>
          <Route path='/contractors/:id([a-zA-Z0-9.+_-]+)/view/' exact component={Contractor}/>
          <Route component={  () => <div>404 Does not exists</div> } />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({type: "LOG_OUT"})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
