import React from 'react';
import Form from './saleform';

export default class App extends React.Component {

  state = {
    renderForm: false
  }

  toggleForm = () => {
    this.setState({renderForm: !this.state.renderForm})
  }

  render(){
    const { sales, dateTimeFormat } = this.props;
    return (
      <div>
        <h3>SALES: </h3><button onClick={ this.toggleForm }>Add new sale</button>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Type</th>
              <th>Price</th>
              <th>Order amount</th>
              <th>Order received</th>
              <th>Deliver By</th>
              <th>Total</th>
            </tr>
            {
              sales.map( (sale) => (
                <tr key={sale._id}>
                  <td>JZ {sale.product.name}</td>
                  <td>{sale.product.size}</td>
                  <td>{sale.product.type} bottle</td>
                  <td>{sale.product.price} so'm</td>
                  <td>{sale.amount}</td>
                  <td>{dateTimeFormat(sale.createdAt)}</td>
                  <td>{dateTimeFormat(sale.deliverBy)}</td>
                  <td>{sale.amount * sale.product.price} so'm</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          this.state.renderForm ? (
            <Form toggleForm={this.toggleForm} {...this.props}/>
          ) : null
        }
      </div>
    )
  }
}