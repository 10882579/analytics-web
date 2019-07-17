import React from 'react';
import cookie from 'react-cookies';
import axios from 'axios';

class App extends React.Component {

  state = {
    name: "",
    location: ""
  }

  updateState = (obj) => {
    this.setState( (prev) => {
      return {...prev, ...obj}
    })
  }
 
  handleSubmit = (e) => {
    e.preventDefault();

    const { addContractor, toggleForm, mode } = this.props;
    const { name, location } = this.state;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";

    if(name && location){
      axios({
        method: 'POST',
        url: `${API_URI}/contractors/add-new/`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Auth-Token': cookie.load('token'),
        },
        data: this.state
      })
      .then((res) => {
        if(res.status == 200) {
          addContractor(res.data);
          toggleForm();
          console.log(this.props.contractors);
          
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
        Name: <input placeholder="name" onChange={ (e) => this.updateState({name: e.target.value}) } /> <br />
        Location: <input placeholder="location" onChange={ (e) => this.updateState({location: e.target.value}) } /> <br />
        <button type="submit">Submit</button>
        <button onClick={ this.props.toggleForm }>Cancel</button>
      </form>
    )
  }
}

export default App