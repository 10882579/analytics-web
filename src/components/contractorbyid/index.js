import React from 'react';
import { connect } from 'react-redux';
import SaleList from './salelist';
import PaymentList from './paymentlist';
import requests from './requests';

class App extends React.Component {

  state = {
    renderForm: false
  }

  componentWillMount = () => {
    requests.getContractorSales(this.props);
    requests.getContractorPayments(this.props);
  }

  dateTimeFormat = (d) => {
    const date = new Date(d);
    const months = ["Jan", "Fab", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  getTotalDue = () => {
    const { sales, payments } = this.props;
    let due = 0;

    sales.forEach( (sale) => {
      due += (sale.amount * sale.product.price);
    });

    payments.forEach( (payment) => {
      due -= payment.amount;
    })

    return due;
  }

  render(){
    const { location } = this.props;
    
    return (
      <div>
        <h1>{location.state.name}</h1>
        <h3>TOTAL DUE: {this.getTotalDue()} so'm</h3>
        <SaleList dateTimeFormat={this.dateTimeFormat} {...this.props}/>
        <PaymentList dateTimeFormat={this.dateTimeFormat} {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.mode,
    account: state.account,
    sales: state.contractor.sales,
    payments: state.contractor.payments,
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
    },
    updateContractorPayments: (data) => {
      dispatch({
        type: "UPDATE_CONTRACTOR_PAYMENTS",
        payload: data
      })
    },
    addNewPayment: (data) => {
      dispatch({
        type: "ADD_NEW_PAYMENT",
        payload: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);