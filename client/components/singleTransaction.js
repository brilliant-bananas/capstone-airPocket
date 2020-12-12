import React from 'react'
import TransForm from './updateTransaction'
import {connect} from 'react-redux'
import {
  updateOneTransaction,
  deleteOneTransaction,
} from '../store/singleTransaction'
import {fetchCategories} from '../store/categories'

class SingleTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderUpdateForm: false,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.renderUpdateForm = this.renderUpdateForm.bind(this)
    this.callUpdateAction = this.callUpdateAction.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchCategories()
    } catch (error) {
      console.log(error)
    }
  }

  renderUpdateForm() {
    this.setState({
      renderUpdateForm: !this.state.renderUpdateForm,
    })
  }

  callUpdateAction(id, transationInfo) {
    debugger
    this.renderUpdateForm()
    this.props.updateTransaction(id, transationInfo)
  }

  async handleDelete(evt) {
    evt.preventDefault()
    await this.props.deleteTransaction(this.props.id)
    await this.props.getTransactions()
  }

  render() {
    let {storeName, amount, date = '', category} = this.props.transaction
    const id = this.props.id
    const {renderUpdateForm} = this.state
    const imgUrl = category.imageUrl

    return (
      <div id="transaction-container">
        <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <img src={`${imgUrl}`} width="35" height="35" />
            <h4 style={{margin: 0, marginLeft: '10px'}}>
              <b>{storeName}</b>
            </h4>
          </div>
          <p>
            ${amount} Transaction Date: {''}
            {date}
          </p>
          <button
            className="btn btn-warning"
            type="button"
            onClick={this.renderUpdateForm}
          >
            Edit
          </button>{' '}
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.handleDelete}
          >
            Delete
          </button>
          <hr className="solid" />
        </div>
        {renderUpdateForm && (
          <div>
            <TransForm
              key={id}
              id={id}
              transaction={this.props.transaction}
              categories={this.props.categories}
              callUpdateAction={this.callUpdateAction}
              getTransactions={this.props.getTransactions}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    categories: state.categories,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    updateTransaction: (id, updateInfo) => {
      return dispatch(updateOneTransaction(id, updateInfo))
    },

    deleteTransaction: (id) => {
      return dispatch(deleteOneTransaction(id))
    },
  }
}

export default connect(mapState, mapDispatch)(SingleTransaction)
