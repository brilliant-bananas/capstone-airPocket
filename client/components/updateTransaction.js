import React from 'react'

class TransForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeName: this.props.transaction.storeName,
      amount: this.props.transaction.amount,
      date: this.props.transaction.date,
      categoryId: this.props.transaction.categoryId,
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
    console.log("this.props.id", this.props.id)
    evt.preventDefault()
    await this.props.updateTransaction(this.props.id, this.state)
    await this.props.getTransactions()
  }

  render() {
    const {storeName, amount, date, categoryId} = this.state
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
          <br />
          <div id="categories">
            <select
              id="selectCategory"
              className="btn btn-primary"
              onChange={this.handleChange}
              name="categoryId"
              value={categoryId || ''}
            >
              <option value="">Select Category</option>
              {this.props.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button type="submit">Confirm Changes</button>
        </form>
      </div>
    )
  }
}

export default TransForm
