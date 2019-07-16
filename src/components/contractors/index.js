import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'; 

class App extends Component {

  render() {
    return(
      <div>
        <h1>Contractors</h1>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
   
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
