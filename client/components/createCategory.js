import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCategoryThunk, fetchCategories} from '../store/categories'
import {withRouter} from 'react-router-dom'

class NewCategory extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    await this.props.addCategoryThunk(this.state.name)
    this.setState({
      name: '',
    })
    await this.props.fetchCategories()
    this.props.history.push(`/categories`)
  }

  render() {
    return (
      <div className="category-add">
        <h4>Create New Category</h4>
        <div className="row">
          <div className="col-sm-4" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              value={this.state.name}
              onChange={this.handleChange}
            ></input>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4">
            <button
              className="btn btn-success"
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCategoryThunk: (name) => dispatch(addCategoryThunk(name)),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default withRouter(connect(null, mapDispatch)(NewCategory))
