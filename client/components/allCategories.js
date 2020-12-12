import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categories'
import NewCategory from './createCategory'
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
      <div id="all-categories">
        <h3>Manage Categories</h3>
        {categories.map((category) => (
          <div key={category.id}>
            <SingleCategory
              id={category.id}
              name={category.name}
              imageUrl={category.imageUrl}
              fetchCategories={this.props.fetchCategories}
            />
          </div>
        ))}
        <hr />
        <div>
          <NewCategory />
        </div>
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
