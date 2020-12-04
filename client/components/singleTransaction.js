import React from 'react'
import {Link} from 'react-router-dom'

const defaultState = {
  amount: 0,
  storeName: ''
}

export class SingleTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    let transaction = this.props.transaction
    this.setState({
      storename: transaction.name,
      amount: transaction.amount
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.updateTransaction(this.props.id, this.state)
    await this.props.getTransactions()
  }

  async handleDelete(evt) {
    evt.preventDefault()
    await this.props.deleteTransaction(this.props.id)
    await this.props.getTransactions()
  }

  render() {
    let {transaction} = this.props
    let {id, storeName, amount} = transaction

    return (
      <li id="singleTransaction">
        <div className="transactionInfo">
          <Link to={`/transactions/${id}`}>
            <h2>{storeName}</h2>
          </Link>
          <h3>${amount}</h3>
        </div>
      </li>
    )
  }
}

export default SingleTransaction
