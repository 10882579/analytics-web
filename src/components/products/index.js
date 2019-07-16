import React, { Component } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import axios from 'axios';

import Form from './form';

class App extends Component {

  state = { 
    renderForm: false
  }

  componentWillMount = () => {
    
    const { updateProducts, mode } = this.props;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";
    
    axios({
      method: 'GET',
      url: `${API_URI}/products/list/`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': cookie.load('token'),
      },
    })
    .then((res) => {
      if(res.status == 200) {
        updateProducts(res.data);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    
  }

  toggleForm = () => {
    this.setState({renderForm: !this.state.renderForm})
  }

  deleteProduct = (id) => {

    const { mode } = this.props;

    const API_URI = mode.SERVER == "production" ? mode.API_URI : "http://localhost:8000";
    
    axios({
      method: 'POST',
      url: `${API_URI}/products/${id}/delete/`,
      headers: {
        'Accept': 'application/json',
        'X-Auth-Token': cookie.load('token'),
      },
    })
    .then((res) => {
      if(res.status == 200) {
        this.props.deleteProduct(id);
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }

  render() {

    const { products } = this.props;

    return(
      <div>
        <h1>Products</h1>
        <button onClick={ this.toggleForm } >Add new product</button> <br/><br/>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Type</th>
              <th>Price</th>
              <th></th>
            </tr>
            {
              products.map( (product, i) => (
                <tr key={product._id}>
                  <td> JZ {product.name}</td>
                  <td>{product.size}</td>
                  <td>{product.type} bottle</td>
                  <td>{product.price} so'm</td>
                  <td><button onClick={ () => this.deleteProduct(product._id) }>Delete</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          this.state.renderForm ? (
            <Form {...this.props} toggleForm={this.toggleForm}/>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.home.products,
    mode: state.mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProducts: (data) => {
      dispatch({
        type: "UPDATE_PRODUCTS",
        payload: data
      })
    },
    addProduct: (data) => {
      dispatch({
        type: "ADD_PRODUCT",
        payload: data
      })
    },
    deleteProduct: (id) => {
      dispatch({
        type: 'DELETE_PRODUCT',
        payload: id
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
