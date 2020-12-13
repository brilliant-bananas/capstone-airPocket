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
    const {name, id, imageUrl} = this.props
    return (
      <>
        <div
          className="category-container container"
          style={{fontsize: '24px'}}
        >
          <img
            className="category-icon"
            src={`${imageUrl}`}
            width="35"
            height="35"
          />{' '}
          <b>{name}</b>
          <button
            style={{marginLeft: 'auto'}}
            className="btn btn-warning"
            onClick={this.renderUpdateForm}
            type="submit"
          >
            Edit
          </button>{' '}
        </div>
        {this.state.renderUpdateForm && (
          <div>
            <UpDateCategoryForm
              name={name}
              id={id}
              callUpdateAction={this.callUpdateAction}
            />
          </div>
        )}
        <hr className="solid" />
      </>
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
