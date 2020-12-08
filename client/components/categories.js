import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categories'

class Categories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  componentDidMount() {
    try {
      this.props.fetchCategories()
    } catch (error) {
      console.log(error)
    }
  }

  handleChange(handleCategoryId) {
     this.setState({

     })

  }
  
  render() {
    const categories = this.props.categories
    const onChange = this.props.onChange
    
    console.log('hello', this.props.categories)
    return (
       <div>
        <select className="btn btn-primary" onChange={onChange} name="category" value={this.state.categoryId}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
            // categoryId={category.id}
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
