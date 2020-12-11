import React, {Component} from 'react'
import {connect} from 'react-redux'

import UpDateCategoryForm from './upDateCategoryForm'

export class SingleCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
    }
  }

  render() {
    console.log('edit state is', this.state.isEdit)
    const {name, id, fetchCategories} = this.props
    console.log('this is name in singleCategory', name)
    return (
      <div>
        <button
          className="btn btn-primary"
          id="edit-button"
          onClick={() => this.setState({isEdit: !this.state.isEdit})}
          type="submit"
        >
          Edit
        </button>
        {this.state.isEdit ? 
              <UpDateCategoryForm name={name} id={id} 
                fetchCategories={fetchCategories} /> 
        : ''}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    category: state.categories,
  }
}

const mapDispatch = (dispatch) => {
  return {
    updatedSingleCategory: (categoryInfo) =>
      dispatch(updatedSingleCategory(categoryInfo)),
  }
}

export default connect(mapState, mapDispatch)(SingleCategory)
