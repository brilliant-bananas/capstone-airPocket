import React, {Component} from 'react'
import {connect} from 'react-redux'
import UpDateCategoryForm from './updateCategory'
import {updatedSingleCategory} from '../store/categories'

export class SingleCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderUpdateForm: false,
    }
    this.renderUpdateForm = this.renderUpdateForm.bind(this)
    this.callUpdateAction = this.callUpdateAction.bind(this)
  }

  renderUpdateForm() {
    this.setState({
      renderUpdateForm: !this.state.renderUpdateForm,
    })
  }

  callUpdateAction(categoryInfo) {
    this.renderUpdateForm()
    this.props.updatedSingleCategory(categoryInfo)
  }

  render() {
    console.log('edit state is', this.state.isEdit)
    const {name, id, imageUrl, fetchCategories} = this.props
    console.log('this is name in singleCategory', name)
    return (
      <div className="category-container">
        <img
          className="category-icon"
          src={`${imageUrl}`}
          width="35"
          height="35"
        />{' '}
        <b>{name}</b>
        <button
          className="btn btn-warning"
          onClick={this.renderUpdateForm}
          type="submit"
        >
          Edit
        </button>{' '}
        <hr className="solid" />
        {this.state.renderUpdateForm && (
          <UpDateCategoryForm
            name={name}
            id={id}
            callUpdateAction={this.callUpdateAction}
            fetchCategories={fetchCategories}
          />
        )}
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
