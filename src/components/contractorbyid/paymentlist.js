import React from 'react';
import Form from './paymentform';

export default class App extends React.Component {

  state = {
    renderForm: false
  }

  toggleForm = () => {
    this.setState({renderForm: !this.state.renderForm})
  }

  render(){
    const { payments, dateTimeFormat } = this.props;
    return (
      <div>
        <h3>PAYMENTS:</h3><button onClick={ this.toggleForm }>Add new payment</button>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment type</th>
            </tr>
            {
              payments.map( (payment) => (
                <tr key={payment._id}>
                  <td>{dateTimeFormat(payment.createdAt)}</td>
                  <td>{payment.amount} so'm</td>
                  <td>{payment.type}</td>
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