import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchCategories} from '../store/categories'
import SingleCategory from './singleCategory'

export class AllCategories extends Component {
  constructor(props) {
    super(props)
    
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categories = this.props.categories
    return (
        <div id = "all-categories">
          {categories.map((category) => (
            <div key={category.id}>
                <h3>{category.name}</h3>
               <SingleCategory id={category.id} name={category.name} 
               fetchCategories={this.props.fetchCategories}/>
              
           </div>  
        ))}
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

export default connect(mapState, mapDispatch)(AllCategories)
