import React from 'react'

class TransForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeName: this.props.transaction.storeName,
      amount: this.props.transaction.amount,
      date: this.props.transaction.date,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.updateTransaction(this.props.id, this.state)
    await this.props.getTransactions()
  }

  render() {
    const {storeName, amount, date} = this.state
    console.log('this state for update-->', this.state)
    return (
      <div className="form-container">
        <form id="transactionForm" onSubmit={this.handleSubmit}>
          <label htmlFor="changeName">Store Name:</label>
          <input
            id="storeName"
            type="text"
            name="storeName"
            value={storeName}
            onChange={this.handleChange}
          />
          <label htmlFor="changeAmount">Price:</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={amount}
            onChange={this.handleChange}
          />
          <label htmlFor="changeDate">Date:</label>
          <input
            id="date"
            type="text"
            name="date"
            value={date}
            onChange={this.handleChange}
          />
          <button type="submit">Confirm Changes</button>
        </form>
      </div>
    )
  }
}

export default TransForm
