import React from 'react'
import {connect} from 'react-redux'
import BarChart from './budget-bar-chart'
import {fetchBudgets, updateBudget, deleteBudget} from '../store/budgets'
import Budget from './budget'

class Budgets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      renderCreateForm: false,
      currentMonth: new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
        new Date()
      ),
    }
    this.updateAction = this.updateAction.bind(this)
    this.deleteAction = this.deleteAction.bind(this)
    this.renderCreateForm = this.renderCreateForm.bind(this)
    this.callCreateAction = this.callCreateAction.bind(this)
  }

  async updateAction(budgetId, budgetInfo) {
    await this.props.updateBudget(budgetId, budgetInfo)
    await this.props.fetchBudgets(this.props.id, 'monthly')
    console.log('Getting updated budgets')
  }

  deleteAction(budgetId) {
    this.props.deleteBudget(budgetId)
    this.props.fetchBudgets(this.props.id, 'monthly')
  }

  componentDidMount() {
    try {
      this.props.fetchBudgets(this.props.id, 'monthly')
    } catch (error) {
      console.log(error)
    }
  }
  renderCreateForm() {
    this.setState({
      renderCreateForm: !this.state.renderCreateForm,
    })
  }

  callCreateAction(budgetId, budgetInfo) {
    this.renderCreateForm()
    this.props.updateAction(budgetId, budgetInfo)
    this.updateProgressBar(budgetInfo)
  }
  render() {
    let total = 0
    let spent = 0
    if (this.props.budgets.length > 0) {
      total = this.props.budgets.reduce(
        (acc, curr) => acc + Number(curr.total),
        0
      )
      spent = this.props.budgets.reduce(
        (acc, curr) => acc + Number(curr.spent),
        0
      )
    }
    return (
      <div>
        <div>
          <h3>
            {this.state.currentMonth} Budget{' '}
            <button className="btn btn-success" onClick={this.renderCreateForm}>
              +
            </button>
            {this.state.renderCreateForm && (
              <Budget
                callCreateAction={this.callCreateAction}
                budget={this.props.budget}
                renderCreateForm={this.renderCreateForm}
              />
            )}
          </h3>
          {this.props.budgets.length > 0 && (
            <div>
              <BarChart total={total} spent={spent} id={'budget'} />
              <hr className="solid" />
            </div>
          )}
          {this.props.budgets.map((budget) => (
            <div key={budget.id}>
              <h4>
                <b>{budget.category.name}</b>
              </h4>
              <div>
                <BarChart
                  total={Number(budget.total)}
                  spent={Number(budget.spent)}
                  showButtons={true}
                  deleteAction={this.deleteAction}
                  updateAction={this.updateAction}
                  budget={budget}
                  id={budget.category.name[0] + budget.categoryId}
                />
                <hr className="solid" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    id: state.user.id,
    budgets: state.budgets,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchBudgets: (userId, period) => dispatch(fetchBudgets(userId, period)),
    updateBudget: (budgetId, budgetInfo) =>
      dispatch(updateBudget(budgetId, budgetInfo)),
    deleteBudget: (budgetId) => dispatch(deleteBudget(budgetId)),
  }
}

export default connect(mapState, mapDispatch)(Budgets)
