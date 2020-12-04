import React from 'react'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store/transaction'
import SingleTransaction from './singleTransaction'

class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getTransactions()
  }
  render() {
    const userId = this.props.userId || ''
    const {transactions} = this.props || {}
    return (
      <div className="container">
        <div className="items">
          <h1 className="center">All Transactions:</h1>
          <ol className="allTransactions">
            {transactions.map(transaction => (
              <SingleTransaction
                transaction={transaction}
                key={transaction.id}
                userId={userId}
                // updateTransaction={this.props.updateProduct}
                // addTransaction={this.props.addCartProduct}
                // deleteTransaction={this.props.deleteProduct}
                // getTransactions={this.props.getTransactions}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  transactions: state.transactions,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getTransactions: () => dispatch(fetchTransactions())
  //   updateTransaction: () => updateOneTransaction(),
  //   deleteTransaction: (id) => deleteOneTransaction(id),
  //   addNewTransaction: (product) => addNewTransaction(product),
})

const AllTransactions = connect(mapState, mapDispatch)(Transactions)
export default AllTransactions
