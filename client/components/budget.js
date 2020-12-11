import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postNewBudget} from '../store/budget'
import {fetchCategories} from '../store/categories'
import {fetchBudgets} from '../store/budgets'

export class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: '',
      categoryId: '',
      userId: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postNewBudget({
      total: this.state.total,
      categoryId: this.state.categoryId,
      userId: this.props.userId,
    })
    this.props.renderCreateForm()
    this.props.fetchBudgets(this.props.userId, 'monthly')
  }
  render() {
    const categories = this.props.categories
    return (
      <form id="form" onSubmit={this.handleSubmit}>
        <label htmlFor="total">
          Budget Amount:
          <input
            type="text"
            name="total"
            value={this.state.total}
            onChange={this.handleChange}
          />
        </label>

        <br />

        <div id="categories">
          <select
            className="btn btn-primary"
            onChange={this.handleChange}
            name="categoryId"
            value={this.state.categoryId || ''}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <br />
        <button className="btn btn-success" onClick={this.renderCreateForm}>
          Submit
        </button>
      </form>
    )
  }
}

const mapState = (state) => {
  return {
    categories: state.categories,
    userId: state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchBudgets: (userId, period) => dispatch(fetchBudgets(userId, period)),
    postNewBudget: (newBudgetObj) => dispatch(postNewBudget(newBudgetObj)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapState, mapDispatch)(Budget)
