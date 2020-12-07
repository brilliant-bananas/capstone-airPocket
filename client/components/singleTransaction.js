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
      isEdit: false,
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  async handleDelete(evt) {
    evt.preventDefault()
    console.log('transaction to delete ID-->', this.props.id)
    await this.props.deleteTransaction(this.props.id)
    await this.props.getTransactions()
  }

  render() {
    let {storeName, amount, date = ''} = this.props.transaction
    const id = this.props.id
    const {isEdit} = this.state

    return (
      <div id="transaction-container">
        <li id="singleTransaction">
          <div className="transactionInfo">
            <h3>{storeName}</h3>
            <h3>${amount}</h3>
            <h3>{date}</h3>
            <TransCategories id={id} transaction={this.props.transaction} />
            <button
              type="button"
              onClick={() => {
                this.setState({isEdit: !this.state.isEdit})
              }}
            >
              Edit
            </button>
            <button type="button" onClick={this.handleDelete}>
              Delete
            </button>
          </div>
        </li>
        {isEdit && (
          <li>
            <TransForm
              key={id}
              id={id}
              transaction={this.props.transaction}
              updateTransaction={this.props.updateTransaction}
              getTransactions={this.props.getTransactions}
            />
          </li>
        )}
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
