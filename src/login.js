import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import axios from 'axios';

class App extends Component {
  
  state = {
    email: "",
    password: ""
  }

  componentWillMount = async () => {
    const { updateAccount, history } = this.props;
    const token = cookie.load('token');
    
    if(token){
      await axios({
        method: 'GET',
        url: 'http://localhost:8000/check-session/',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': token,
        },
      })
      .then((res) => {
        if(res.status == 200) {
          updateAccount({loggedIn: true});
          history.push("/products/");
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }
    
  }

  updateState = (obj) => {
    this.setState( (prev) => {
      return {...prev, ...obj}
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { updateAccount, history } = this.props;
    if (email.length > 0 && password.length > 0){
      axios({
        method: 'POST',
        url: 'http://localhost:8000/login/',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: this.state
      })
      .then((res) => {
        if(res.status == 200) {
          cookie.save("token", res.data.token, {path: '/'});
          updateAccount({...res.data, loggedIn: true});
          this.setState({email: "", password: ""});
          history.push("/products/");
        }
      })
      .catch((err) => {
        alert("Please check entry");
      })
    }
  }

  render() {
    return(
      <div>
        <h1>Login</h1>
        <form onSubmit={ this.handleSubmit }>
          <input placeholder='email' value={ this.state.email } onChange={ (e) => this.updateState({email: e.target.value})}/> <br />
          <input placeholder='password' type='password' value={ this.state.password } onChange={ (e) => this.updateState({password: e.target.value})}/> <br />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (obj) => {
      dispatch({
        type: "UPDATE_ACCOUNT",
        payload: obj
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
