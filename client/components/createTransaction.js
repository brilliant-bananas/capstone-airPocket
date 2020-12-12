import React from 'react'
import {connect} from 'react-redux'
import {fetchTransactions, createNewTransaction} from '../store/transaction'
import {fetchCategories} from '../store/categories'
import {Link, withRouter} from 'react-router-dom'

class NewTransForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeName: '',
      amount: 0,
      date: '',
      categoryId: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchCategories()
    } catch (error) {
      console.log(error)
    }
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    await this.props.newTransaction(
      this.state.storeName,
      this.state.amount,
      this.state.date,
      this.state.categoryId
    )
    await this.props.getTransactions()
    this.setState({storeName: '', amount: 0, date: '', categoryId: ''})
    this.props.history.push(`/transactions`)
  }

  render() {
    const {storeName, amount, date, categoryId} = this.state
    return (
      <div>
        <form id="newTransactionForm" onSubmit={this.handleSubmit}>
          <h2>Add Transaction</h2>
          <div id="categories">
            <select
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
          <label htmlFor="changeName">Store Name:</label>
          <input
            id="storeName"
            type="text"
            name="storeName"
            required
            value={storeName}
            onChange={this.handleChange}
          />
          <label htmlFor="changeAmount">Price:</label>
          <input
            id="amount"
            type="number"
            name="amount"
            required
            value={amount}
            onChange={this.handleChange}
          />
          <label htmlFor="changeDate">Date:</label>
          <input
            id="date"
            type="text"
            name="date"
            required
            value={date}
            onChange={this.handleChange}
          />
          <br />

          <br />
          {/* <Link to="/transactions"> */}
          <button className="btn btn-success" type="submit">
            Confirm Changes
          </button>
          {/* </Link> */}
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    categories: state.categories,
  }
}
const mapDispatch = (dispatch) => ({
  newTransaction: (storeName, amount, date, categoryId) =>
    dispatch(createNewTransaction(storeName, amount, date, categoryId)),
  getTransactions: () => dispatch(fetchTransactions()),
  fetchCategories: () => dispatch(fetchCategories()),
})

export default withRouter(connect(mapState, mapDispatch)(NewTransForm))
