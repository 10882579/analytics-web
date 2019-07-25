import React from 'react';
import requests from './requests';

class App extends React.Component {

  state = {
    product: "",
    deliverBy: "",
    amount: 0
  }

  updateState = (obj) => {
    this.setState( (prev) => {
      return {...prev, ...obj}
    })
  }
 
  handleSubmit = (e) => {
    e.preventDefault();

    const { product, amount } = this.state;
    if(product && amount > 0){
      requests.addNewSale(this.props, this.state);
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
        Amount: <input type="text" value={this.state.amount} onChange={ (e) => this.updateState({amount: e.target.value}) }/><br />
        Deliver by: <input type="date" value={this.state.date} onChange={ (e) => this.updateState({deliverBy: e.target.value}) }/><br />
        <br />
        <button type="submit">Submit</button>
        <button onClick={ this.props.toggleForm }>Cancel</button>
      </form>
    )
  }
}

export default App