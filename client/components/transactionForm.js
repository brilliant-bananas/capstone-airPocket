import React from 'react'

class TransForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeName: '',
      amount: 0,
      date: '0000-00-00',
      ...this.props.transaction,
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
    const {handleChange, handleSubmit} = this.props
    const {storeName, amount, date} = this.state
    return (
      <div className="form-container">
        <form id="transactionForm" onSubmit={handleSubmit}>
          <label htmlFor="changeName">Store Name:</label>
          <input
            type="text"
            name="name"
            value={storeName}
            onChange={handleChange}
          />
          <label htmlFor="changePrice">Price:</label>
          <input
            type="number"
            name="price"
            value={amount}
            onChange={handleChange}
          />
          <label htmlFor="changeDate">Date:</label>
          <input type="text" name="date" value={date} onChange={handleChange} />
          <button type="submit">Confirm Changes</button>
        </form>
      </div>
    )
  }
}

export default TransForm
