import React from 'react'

export default class BudgetForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: this.props.budget.categoryId,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const amount = evt.target.amount.value
      ? evt.target.amount.value
      : this.props.budget.total
    this.props.callUpdateAction(this.props.budget.id, {
      amount: parseFloat(amount),
    })
  }

  onCategoryChange = (categoryId) => {
    this.setState({categoryId: parseInt(categoryId)})
  }

  render() {
    return (
      <div>
        <form id="budget-form" onSubmit={this.handleSubmit}>
          <div>
            <label className="col-sm-2 col-form-label">Amount:</label>
            <input
              type="number"
              id="amount"
              min="0"
              placeholder={this.props.budget.total}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    )
  }
}
