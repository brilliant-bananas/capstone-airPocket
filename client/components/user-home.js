import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import BarChart from './budget-bar-chart'
import {fetchBudgets} from '../store/budgets'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super()
    this.state = {
      width: 400,
      height: 20,
      id: 'budget',
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
    console.log('User home Props', this.props)

    let total = 0
    let remaining = 0
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
      remaining = total - spent
    }
    return (
      <div>
        <h2>Welcome {this.props.firstName}!</h2>
        <div>
          <hr className="solid" />
          <h3>{this.state.currentMonth} Budget</h3>
          {this.props.budgets.length > 0 && (
            <div>
              <BarChart
                total={total}
                spent={spent}
                showButtons={false}
                width={this.state.width}
                height={this.state.height}
                id={this.state.id}
              />
              <hr className="solid" />
            </div>
          )}
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
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    id: state.user.id,
    budgets: state.budgets,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchBudgets: (userId, period) => dispatch(fetchBudgets(userId, period)),
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
