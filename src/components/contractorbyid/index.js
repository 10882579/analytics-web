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

  dateTimeFormat = (d) => {
    const date = new Date(d);
    const months = ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
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
                <th>Order received</th>
                <th>Deliver By</th>
              </tr>
              {
                sales.map( (sale) => (
                  <tr key={sale._id}>
                    <td> JZ {sale.product.name}</td>
                    <td>{sale.product.size}</td>
                    <td>{sale.product.type} bottle</td>
                    <td>{sale.product.price} so'm</td>
                    <td>{sale.amount}</td>
                    <td>{sale.amount * sale.product.price} so'm</td>
                    <td>{this.dateTimeFormat(sale.createdAt)}</td>
                    <th>{this.dateTimeFormat(sale.deliverBy)}</th>
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
    },
    addNewSale: (data) => {
      dispatch({
        type: "ADD_NEW_SALE",
        payload: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);