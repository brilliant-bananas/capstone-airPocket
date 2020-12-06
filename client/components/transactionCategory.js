import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categories'
import {updateOneTransaction} from '../store/singleTransaction'

class TransCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: this.props.transaction.categoryId,
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    try {
      this.props.fetchCategories()
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(evt) {
    this.setState(
      {
        categoryId: evt.target.value,
      },
      function () {
        this.props.updateTransaction(this.props.id, this.state)
      }
    )
  }

  render() {
    // console.log('selectedId-->', this.state.selectedId)
    // console.log('transactionId state-->', this.props.id)
    return (
      <div id="categories">
        <select
          className="btn btn-primary"
          onChange={this.handleChange}
          value={this.state.categoryId || ''}
        >
          <option value="">Select Category</option>
          {this.props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br />
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
    updateTransaction: (id, transactionInfo) =>
      dispatch(updateOneTransaction(id, transactionInfo)),
  }
}
export default connect(mapState, mapDispatch)(TransCategories)
