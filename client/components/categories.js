import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categories'

class Categories extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    try {
      this.props.fetchCategories()
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    console.log('hello', this.props.categories)
    return (
      <div>
        Categories:
        <select className="btn btn-primary">
          {this.props.categories.map((category) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
        <br />
      </div>
    )
  }
}
const mapState = (state) => {
  return {
    categories: state.categories,
  }
}
const mapDispatch = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(mapState, mapDispatch)(Categories)
