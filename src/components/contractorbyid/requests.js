import axios from 'axios';
import cookie from 'react-cookies';

export default {
  getContractorSales: (props) => {
    const { location, account, mode, updateContractorSales, history } = props;

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
      history.push("/contractors/");
    }
  },
  getContractorPayments: (props) => {
    const { location, account, mode, updateContractorPayments, history } = props;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";

    if(account.loggedIn && location.state){
      axios({
        method: 'GET',
        url: `${API_URI}/contractors/${location.state._id}/payments/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': cookie.load('token'),
        },
      })
      .then((res) => {
        if(res.status == 200) {
          updateContractorPayments(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }
    else{
      history.push("/contractors/");
    }
  },
  addNewSale: (props, data) => {

    const { toggleForm, mode, addNewSale, location } = props;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";

    axios({
      method: 'POST',
      url: `${API_URI}/sales/add-new/`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': cookie.load('token'),
      },
      data: {
        customer: location.state._id,
        ...data
      }
    })
    .then((res) => {
      if(res.status == 200) {
        addNewSale(res.data);
        toggleForm();
      }
    })
    .catch((err) => {
      console.error(err);
    })
  },
  addNewPayment: (props, data) => {

    const { toggleForm, mode, addNewPayment, location } = props;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";

    axios({
      method: 'POST',
      url: `${API_URI}/payments/add-new/`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': cookie.load('token'),
      },
      data: {
        customer: location.state._id,
        ...data
      }
    })
    .then((res) => {
      if(res.status == 200) {
        addNewPayment(res.data);
        toggleForm();
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }
}