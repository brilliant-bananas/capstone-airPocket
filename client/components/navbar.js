import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <>
    <nav className="app-navbar navbar navbar-light bg-light">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <img src="/icons/home.png" width="30" height="30" />
          </Link>
          <Link to="/budgets">
            <img src="/icons/budget.png" width="30" height="30" />
          </Link>
          <Link to="/transactions">
            <img src="/icons/transactions.png" width="30" height="30" />
          </Link>
          <Link to="/categories">
            <img src="/icons/category.png" width="30" height="30" />
          </Link>
          <a href="#" onClick={handleClick}>
            <img src="/icons/logout.png" width="30" height="30" />
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <img src="/icons/log-in.png" width="30" height="30" />
          </Link>
          <Link to="/signup">
            <img src="/icons/sign-up.png" width="30" height="30" />
          </Link>
        </div>
      )}
    </nav>
  </>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
