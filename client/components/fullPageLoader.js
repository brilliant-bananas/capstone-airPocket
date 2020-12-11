import React from 'react'
import loaderImg from '../../public/spinner.gif'

class FullPageLoader extends React.Component {
  state = {}

  render() {
    const {loading} = this.props
    if (!loading) return null
    return (
      <div class="loader-container">
        <div className="loader">
          <img src={loaderImg} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({loading: state.application.loading})

export default connect(mapStateToProps)(FullPageLoader)
