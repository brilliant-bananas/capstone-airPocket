import React, {Component} from 'react'

export class UpdateCategoryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      id: this.props.id,
      updateChanges: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.callUpdateAction({
      name: this.state.name,
      id: this.state.id,
    })
    this.setState({
      name: '',
      id: '',
    })
    this.props.fetchCategories()
  }

  render() {
    return (
      <div className="form-container">
        <form id="form" style={{display: 'flex'}} onSubmit={this.handleSubmit}>
          <label htmlFor="name" style={{display: 'none'}}>
            Category Name
          </label>
          <input
            style={{marginRight: '10px'}}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <button
            className="btn btn-success"
            type="submit"
            onClick={() =>
              this.setState({updateChanges: !this.state.updateChanges})
            }
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default UpdateCategoryForm
