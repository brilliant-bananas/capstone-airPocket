import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categories'

class Categories extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelectChange = this.handleSelectChange.bind(this)

  }
  componentDidMount() {
    try {
      this.props.fetchCategories()
    } catch (error) {
      console.log(error)
    }
  }

  handleSelectChange(evt) {
    this.props.onCategoryChange(evt.target.value)
  }
  render() {
   return (
      <div>
        <label className="col-sm-2 col-form-label">Categories:</label>
        <select
          className="btn btn-info"
          onChange={this.handleSelectChange}
          value={this.props.initialCategoryId}
        >
          {this.props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
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
