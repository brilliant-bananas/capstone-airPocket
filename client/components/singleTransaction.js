import React from 'react'
import TransCategories from './transactionCategory'
import TransForm from './transactionForm'

export class SingleTransaction extends React.Component {
  constructor(props) {
    super(props)
    const {transaction} = this.props
    this.state = {
      id: transaction.id,
      amount: transaction.amount,
      storeName: transaction.storeName,
      date: transaction.date,
      categoryId: transaction.categoryId,
      inEdit: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    let transaction = this.props.transaction
    this.setState({
      storename: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const {amount, storeName, date} = this.state
    await this.props.updateTransaction(this.state.id, {amount, storeName, date})
    await this.props.getTransactions()
  }

  async handleDelete(evt) {
    evt.preventDefault()
    await this.props.deleteTransaction(this.state.id)
    await this.props.getTransactions()
  }

  render() {
    let {id, storeName, amount} = this.state
    const date = this.state.date || ''

    return (
      <div id="transaction-container">
        <li id="singleTransaction">
          <div className="transactionInfo">
            <h3>{storeName}</h3>
            <h3>${amount}</h3>
            <h3>{date}</h3>
            <TransCategories id={id} transaction={this.props.transaction} />
            <button type="button">Edit</button>
            <button type="button" onClick={this.handleDelete}>
              Delete
            </button>
          </div>
        </li>
        <li>
          <TransForm
            key={id}
            state={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </li>
      </div>
    )
  }
}

export default SingleTransaction
