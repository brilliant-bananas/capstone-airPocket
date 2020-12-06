import React from 'react'
import TransCategories from './transactionCategory'
import TransForm from './transactionForm'
import {connect} from 'react-redux'
import {
  updateOneTransaction,
  deleteOneTransaction,
} from '../store/singleTransaction'

class SingleTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeName: '',
      amount: 0,
      date: '0000-00-00',
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    let {transaction} = this.props
    this.setState({
      storeName: transaction.storeName,
      amount: transaction.amount,
      date: transaction.date,
    })
  }

  async handleDelete(evt) {
    evt.preventDefault()
    console.log('transaction to delete ID-->', this.props.id)
    await this.props.deleteTransaction(this.props.id)
    await this.props.getTransactions()
  }

  render() {
    let {storeName, amount} = this.state
    const date = this.state.date || ''
    const id = this.props.id

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
          <TransForm key={id} id={id} state={this.state} />
        </li>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateTransaction: (id, updateInfo) => {
      return dispatch(updateOneTransaction(id, updateInfo))
    },

    deleteTransaction: (id) => {
      return dispatch(deleteOneTransaction(id))
    },
  }
}

export default connect(null, mapDispatch)(SingleTransaction)
