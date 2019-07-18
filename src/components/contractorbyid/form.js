import React from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

class App extends React.Component {

  state = {
    product: "",
    amount: 0
  }

  updateState = (obj) => {
    this.setState( (prev) => {
      return {...prev, ...obj}
    })
  }
 
  handleSubmit = (e) => {
    e.preventDefault();
    
    const { toggleForm, mode, updateContractorSales, location } = this.props;

    const { product, amount } = this.state;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";

    if(product && amount > 0){
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
          ...this.state
        }
      })
      .then((res) => {
        if(res.status == 200) {
          updateContractorSales(res.data);
          toggleForm();
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }


  render(){

    const { products } = this.props;

    return (
      <form onSubmit={ (e) => this.handleSubmit(e) }>

        Product:
        <select value={this.state.product} onChange={ (e) => this.updateState({product: e.target.value}) }>
          <option></option>
          {
            products.map( (product) => (
              <option key={product._id} value={product._id}>
                {product.name} {product.size} {product.type} bottle
              </option>
            ))
          }
        </select> <br />
        Amount: <input type="text" value={this.state.amount} onChange={ (e) => this.updateState({amount: e.target.value}) }/>
        
        <br />
        <button type="submit">Submit</button>
        <button onClick={ this.props.toggleForm }>Cancel</button>
      </form>
    )
  }
}

export default App