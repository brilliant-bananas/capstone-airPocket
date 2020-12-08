import React from 'react'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store/transaction'
import SingleTransaction from './singleTransaction'
import {Link} from 'react-router-dom'

class Transactions extends React.Component {
  componentDidMount() {
    this.props.getTransactions()
  }
  render() {
    const {transactions} = this.props || {}
    return (
      <div className="container">
        <div className="items">
          <h1 className="center">
            All Transactions{' '}
            <Link to="/camera">
              <button className="btn btn-success">+</button>
            </Link>
          </h1>
          <ol className="allTransactions">
            {transactions.map((transaction) => (
              <SingleTransaction
                transaction={transaction}
                key={transaction.id}
                id={transaction.id}
                getTransactions={this.props.getTransactions}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

const mapState = (state) => ({
  transactions: state.transactions,
  userId: state.user.id,
})

const mapDispatch = (dispatch) => ({
  getTransactions: () => dispatch(fetchTransactions()),
})

const AllTransactions = connect(mapState, mapDispatch)(Transactions)
export default AllTransactions
