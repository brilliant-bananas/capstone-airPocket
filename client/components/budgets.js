import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BarChart from './budget-bar-chart'
import {fetchBudgets} from '../store/budgets'

/**
 * COMPONENT
 */
class Budgets extends React.Component {
  constructor(props) {
    super()
    this.state = {
      width: 400,
      height: 20,
      currentMonth: new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
        new Date()
      ),
    }
  }
  componentDidMount() {
    try {
      this.props.fetchBudgets(this.props.id, 'monthly')
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    console.log('Budgets Props', this.props)

    let total = 0
    let remaining = 0
    let spent = 0
    if (this.props.budgets.length > 0) {
      total = this.props.budgets.reduce(
        (acc, curr) => acc + Number(curr.total),
        0
      )
      remaining = this.props.budgets.reduce(
        (acc, curr) => acc + Number(curr.remaining),
        0
      )
      spent = total - remaining
    }
    return (
      <div>
        <div>
          <h3>{this.state.currentMonth} Budget</h3>
          {this.props.budgets.length > 0 && (
            <div>
              <p>
                You have spent ${spent} out of ${total}. You have ${remaining}{' '}
                remaining this month.
              </p>
              <BarChart
                total={total}
                spent={spent}
                width={this.state.width}
                height={this.state.height}
                id={'budget'}
              />
            </div>
          )}
          {this.props.budgets.map((budget) => (
            <div key={budget.id}>
              <h4>
                <u>{budget.category.name} budget</u>
              </h4>
              <p>
                You have spent $
                {Number(budget.total) - Number(budget.remaining)} out of $
                {budget.total}. You have ${budget.remaining} remaining this
                month.
              </p>
              <div id={budget.category.name[0] + budget.categoryId}>
                <BarChart
                  total={Number(budget.total)}
                  spent={Number(budget.total) - Number(budget.remaining)}
                  width={this.state.width}
                  height={this.state.height}
                  id={budget.category.name[0] + budget.categoryId}
                />
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
  }
}

export default connect(mapState, mapDispatch)(Budgets)
