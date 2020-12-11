import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

const defaultState = {
  name: '',
}

class CreateCategory extends Component {
  constructor() {
    super()
    this.state = {
        name: ''
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
    console.log("the state of category is", this.state.name)  
    event.preventDefault()
    try {
        await axios.post('/api/categories', {
        name: this.state.name,
      })
      this.setState({
          name: ''
      })
    } catch (error) {
      console.error('Error Adding category')
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Enter a Category</h2>

        <div className="row">
          <div className="col-sm-4" onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Category"
              aria-label="Name"
              aria-describedby="basic-addon1"
              value={this.state.category}
              onChange={this.handleChange}
            >
            </input>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-md-4 col-lg-4">
            <button
              type="button"
              className="btn btn-primary btn-block"
               onClick={this.handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateCategory
