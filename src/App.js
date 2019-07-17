import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import cookie from 'react-cookies';

import Products from './components/products/index';
import Contractors from './components/contractors/index';
import Login from './components/account/login';

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
          <Route path='/products/' exact component={ () => (
            !account.loggedIn ? (
              <Redirect to="/login/"/>
            ) : <Products />
          )} />
          <Route path='/contractors/' exact component={ () => (
            !account.loggedIn ? (
              <Redirect to="/login/"/>
            ) : <Contractors />
          )} />
          <Route path='/logout/' exact component={ () => {
            console.log(this.props)
            return <Redirect to="/login/"/>
          }} />
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
