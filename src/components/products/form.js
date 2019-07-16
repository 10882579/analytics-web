import React from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

class App extends React.Component {

  state = {
    name: "",
    size: "1.0 L",
    type: "Plastic",
    price: 0,
  }

  updateState = (obj) => {
    this.setState( (prev) => {
      return {...prev, ...obj}
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { addProduct, toggleForm, mode } = this.props;
    const { name, size, type, price } = this.state;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";

    if(name && size && type && price > 0){
      axios({
        method: 'POST',
        url: `${API_URI}/products/add-new/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': cookie.load('token'),
        },
        data: this.state
      })
      .then((res) => {
        if(res.status == 200) {
          addProduct(res.data);
          toggleForm();
        }
      })
      .catch((err) => {
        console.error(err);
      })
    }
  }


  render(){
    return (
      <form onSubmit={ (e) => this.handleSubmit(e) }>
        <br /><br /><br />
        Name: <input placeholder="e.g. Lemon" onChange={ (e) => this.updateState({name: e.target.value}) } /> <br />
        Size: 
        <select onChange={ (e) => this.updateState({size: e.target.value}) } value={ this.state.size} >
          <option value="250 mL">250 mL</option>
          <option value="500 mL">500 mL</option>
          <option value="1.0 L">1.0 L</option>
          <option value="1.5 L">1.5 L</option>
          <option value="2.0 L">2.0 L</option>
        </select> <br />
        Type:
        <select onChange={ (e) => this.updateState({type: e.target.value}) } value={ this.state.type} >
          <option value="250 mL">Plastic</option>
          <option value="500 mL">Glass</option>
        </select> bottle<br />
        Price: <input placeholder="e.g. 5000" onChange={ (e) => this.updateState({price: parseFloat(e.target.value)})} /> so'm <br />
        <button type="submit">Submit</button>
        <button onClick={ this.props.toggleForm }>Cancel</button>
      </form>
    )
  }
}

export default App