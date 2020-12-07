import React, { Component } from "react";
import { connect } from "react-redux";

import Categories from "./categories"
import { postNewBudget } from "../store/budget"

export class Budget extends Component {
    constructor(props) {
      super(props);
      this.state = {
        total: "",
        period: "monthly",
        category:""
      } 
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this) 
    }

    handleChange(event) {
       this.setState({
           [event.target.name]: event.target.value
       })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.postNewBudget({
            total: this.state.total,
            period: this.state.period,
            category: this.state.category
        })
        this.setState({
            total:"",
            period:"",
            category:""
       })
    }
    
    render() {
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
             <br />
            
            <label htmlFor="period" >
              Period: 
              <select value={this.state.period} onChange={this.handleChange}>
                <option value="monthly">Monthly</option>  
                <option value="yearly">Yearly</option>
              </select> 
            </label>

            <label htmlFor="category">
              Categories:
              <Categories />
            </label>
            
             <button type="submit">Submit</button>
          </form>    
        )
    }
}

const mapDispatch = (dispatch) => {
    return {
        postNewBudget: (newBudgetObj) => dispatch(postNewBudget(newBudgetObj))
    }
}

export default connect(null, mapDispatch)(Budget)


