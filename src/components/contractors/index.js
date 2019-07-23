import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import axios from 'axios';

import Form from './form';


class App extends Component {

  state = {
    renderForm: false
  }

  componentWillMount = () => {
    
    const { mode, updateContractors } = this.props;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";
    
    axios({
      method: 'GET',
      url: `${API_URI}/contractors/list/`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': cookie.load('token'),
      },
    })
    .then((res) => {
      if(res.status == 200) {
        updateContractors(res.data);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    
  }

  toggleForm = () => {
    this.setState({renderForm: !this.state.renderForm})
  }

  handleRedirect = (contractor) => {
    const { history } = this.props;
    history.push(`/contractors/${contractor._id}/view/`, contractor);
  }

  render() {
    const { contractors } = this.props;

    return(
      <div>
        <h1>Contractors</h1>
        <button onClick={ this.toggleForm } >Add new contractor</button> <br/><br/>
        <table>
          <tbody>
            <tr>
              <th>Organization/Firm</th>
              <th>Location</th>
              <th>Email</th>
              <th>Phone number</th>
              <th></th>
            </tr>
            {
              contractors.map( (contractor, i) => (
                <tr key={contractor._id}>
                  <td>{contractor.name}</td>
                  <td>{contractor.location}</td>
                  <td>{contractor.email}</td>
                  <td>+998 {contractor.phoneNumber}</td>
                  <td><button onClick={ () => this.handleRedirect(contractor) }>View</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          this.state.renderForm ? (
            <Form {...this.props} toggleForm={this.toggleForm}/>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    contractors: state.home.contractors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateContractors: (data) => {
      dispatch({
        type: "UPDATE_CONTRACTORS",
        payload: data
      })
    },
    addContractor: (obj) => {
      dispatch({
        type: "ADD_CONTRACTOR",
        payload: obj
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
