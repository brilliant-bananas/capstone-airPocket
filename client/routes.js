import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import HomePage from './components/home-page'
import {me} from './store'
import Camera from './components/camera'
import AllTransactions from './components/allTransactions'
import Budgets from './components/budgets'
import Budget from './components/budget'
import CreateCategory from './components/createCategory'
import AllCategories  from './components/allCategories'

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
            <Route path="/budget" component={Budget} />
            <Route path="/createCategories" component={CreateCategory} />
            <Route path="/allCategories" component={AllCategories} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
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
