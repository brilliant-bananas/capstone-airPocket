import React, { Component } from "react";
import { connect } from "react-redux";

import {updatedSingleCategory} from '../store/categories'

export class UpdateCategoryForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.name,
        id: this.props.id,
        updateChanges: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  
    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  
    async handleSubmit(event) {
      console.log("values are", this.state.name, this.state.id)
      event.preventDefault();
      await this.props.updatedSingleCategory({
        name: this.state.name,
        id: this.state.id,
      });
      this.setState({
        name: "",
        id: ""
      });
      this.props.fetchCategories()
    }
  
    render() {
      return (
        <form id="form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">
             name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
  
          <button type="submit" onClick={ () => this.setState({updateChanges: 
            !this.state.updateChanges})}>Update Category</button>  
        </form>
      );
    }
  }
  
  const mapDispatch = (dispatch) => {
    return {
      updatedSingleCategory: (categoryInfo) =>
      dispatch(updatedSingleCategory(categoryInfo)),
    };
  };
  
  export default connect(null, mapDispatch)(UpdateCategoryForm);
  