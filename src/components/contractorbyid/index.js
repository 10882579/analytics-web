import React from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import axios from 'axios';

import Form from "./form";

class App extends React.Component {

  state = {
    renderForm: false
  }

  componentWillMount = () => {

    const { location, account, mode, updateContractorSales, history } = this.props;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";

    if(account.loggedIn && location.state){
      axios({
        method: 'GET',
        url: `${API_URI}/contractors/${location.state._id}/sales/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': cookie.load('token'),
        },
      })
      .then((res) => {
        if(res.status == 200) {
          updateContractorSales(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }
    else{
      history.push("/products/");
    }
  }

  toggleForm = () => {
    this.setState({renderForm: !this.state.renderForm})
  }

  render(){
    const { location, sales } = this.props;
    
    return (
      <div>
        <h1>{location.state.name}</h1>
        <button onClick={ this.toggleForm } >Add new sale</button> <br/><br/>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Type</th>
                <th>Price</th>
                <th>Order amount</th>
                <th>Total</th>
                <th>Delivered</th>
              </tr>
              {
                sales.map( (product) => (
                  <tr key={product._id}>
                    <td> JZ {product.name}</td>
                    <td>{product.size}</td>
                    <td>{product.type} bottle</td>
                    <td>{product.price} so'm</td>
                    <td>{product.amount}</td>
                    <td>{product.amount * product.price} so'm</td>
                    <td>
                      <input type="checkbox" checked={product.delivered ? "checked" : null } disabled/>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        {
          this.state.renderForm ? (
            <Form toggleForm={this.toggleForm} {...this.props}/>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    account: state.account,
    sales: state.contractor.sales,
    products: state.home.products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateContractorSales: (data) => {
      dispatch({
        type: "UPDATE_CONTRACTOR_SALES",
        payload: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);