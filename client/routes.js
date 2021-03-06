import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import Camera from './components/camera'
import AllTransactions from './components/allTransactions'
import Budgets from './components/budgets'
import AllCategories from './components/allCategories'
import NewCategory from './components/createCategory'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div style={{marginBottom: '90px'}}>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          {/* <Route exact path="/" component={UserHome} /> */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/camera" component={Camera} />
              <Route path="/transactions" component={AllTransactions} />
              <Route path="/budgets" component={Budgets} />
              <Route path="/categories" component={AllCategories} />
              <Route path="/createCategory" component={NewCategory} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
