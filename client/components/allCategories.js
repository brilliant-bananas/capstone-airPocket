import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/categories'
import SingleCategory from './singleCategory'
import {Link} from 'react-router-dom'

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
        <h3>
          Manage Categories{' '}
          <Link to="/createCategory">
            <button className="btn btn-success">+</button>
          </Link>
        </h3>
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
