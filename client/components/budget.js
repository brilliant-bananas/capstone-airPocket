import React, {Component} from 'react'
import {connect} from 'react-redux'

import Categories from './categories'
import {postNewBudget} from '../store/budget'

export class Budget extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: '',
      //category: categoryId from parent,,
    
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  
  handleChange(event) {
      console.log("the states are", event.target.value)
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    console.log('the state of category', this.state.total)
    event.preventDefault()
    this.props.postNewBudget({
      total: this.state.total,
      category: this.state.category,
    })
    this.setState({
      total: '',
      
    })
  }
  
  render() {
      console.log("The props are", this.props)
    return (
      <form id="form" onSubmit={this.handleSubmit}>
        <label htmlFor="total">
          Budget Amount:
          <input
            type="text"
            name="total"
            value={this.state.total}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="category">
          Categories:
          <Categories onChange={this.handleChange}  value={this.state.category} />
        </label>

        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    postNewBudget: (newBudgetObj) => dispatch(postNewBudget(newBudgetObj)),
  }
}

export default connect(null, mapDispatch)(Budget)
