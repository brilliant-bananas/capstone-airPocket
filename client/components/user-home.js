import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super()
    this.state = {
      data: [12, 5, 6, 6, 9, 10],
      width: 700,
      height: 500,
      id: 'budget',
      currentMonth: new Intl.DateTimeFormat('en-US', {month: 'long'}).format(
        new Date()
      )
    }
  }

  render() {
    console.log('PROPS USER HOME', this.props)
    return (
      <div>
        <h2>Welcome {this.props.email}!</h2>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
