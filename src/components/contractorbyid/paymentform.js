import React from 'react';
import requests from './requests';

class App extends React.Component {

  state = {
    amount: 0,
    type: "Cash"
  }

  updateState = (obj) => {
    this.setState( (prev) => {
      return {...prev, ...obj}
    })
  }
 
  handleSubmit = (e) => {
    e.preventDefault();

    if(this.state.amount > 0){
      requests.addNewPayment(this.props, this.state);
    }
  }


  render(){

    return (
      <form onSubmit={ (e) => this.handleSubmit(e) }>

        Payment option:
        <select value={this.state.type} onChange={ (e) => this.updateState({type: e.target.value}) }>
          <option value="Cash">Cash</option>
          <option value="Credit">Credit</option>
        </select> <br />
        Amount: <input type="text" value={this.state.amount} onChange={ (e) => this.updateState({amount: e.target.value}) }/><br />
        <button type="submit">Submit</button>
        <button onClick={ this.props.toggleForm }>Cancel</button>
      </form>
    )
  }
}

export default App