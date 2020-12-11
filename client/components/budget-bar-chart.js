import React, {Component} from 'react'
import * as d3 from 'd3'
import BudgetForm from './budget-form'

export default class BarChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderUpdateForm: false,
      progress: '',
    }
    this.renderMessage = this.renderMessage.bind(this)
    this.callUpdateAction = this.callUpdateAction.bind(this)
    this.renderUpdateForm = this.renderUpdateForm.bind(this)
    this.callDeleteAction = this.callDeleteAction.bind(this)
  }

  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
    let progressBarColor = 'green'
    const segmentWidth = 350

    const svg = d3
      .select('#' + this.props.id)
      .append('svg')
      .attr('width', 400)
      .attr('height', 20)

    svg
      .append('rect')
      .attr('class', 'bg-rect')
      .attr('rx', 10)
      .attr('ry', 50)
      .attr('fill', 'gray')
      .attr('height', 15)
      .attr('width', function () {
        return segmentWidth
      })
      .attr('x', 0)

    let progress = svg
      .append('rect')
      .attr('class', 'progress-rect')
      .attr('fill', progressBarColor)
      .attr('height', 15)
      .attr('width', 0)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('x', 0)

    let progressBarWidth = segmentWidth
    if (this.props.total >= this.props.spent) {
      const spent = this.props.spent / this.props.total
      progressBarWidth = segmentWidth * spent

      if (progressBarWidth === segmentWidth) {
        progressBarColor = 'yellow'
      }
    } else {
      progressBarColor = 'red'
    }

    progress
      .transition()
      .duration(1000)
      .attr('fill', progressBarColor)
      .attr('width', function () {
        return progressBarWidth
      })

    this.setState({
      progress,
    })
  }

  updateProgressBar(budgetInfo) {
    let progressBarColor = 'green'
    const segmentWidth = 350

    const spent = Number()
    const total = Number(budgetInfo.amount)

    let progressBarWidth = segmentWidth
    if (total >= spent) {
      const spent = Number(this.props.spent / total)
      progressBarWidth = Number(segmentWidth * spent)

      if (progressBarWidth === segmentWidth) {
        progressBarColor = 'yellow'
      }
    } else {
      progressBarColor = 'red'
    }

    let progress = this.state.progress

    progress
      .transition()
      .duration(1000)
      .attr('fill', progressBarColor)
      .attr('width', function () {
        return progressBarWidth
      })

    this.setState({
      progress,
    })
  }

  renderMessage() {
    var currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    const total = currencyFormatter.format(this.props.total)
    const spent = currencyFormatter.format(this.props.spent)
    const remaining = currencyFormatter.format(
      this.props.total - this.props.spent
    )
    if (this.props.spent > this.props.total) {
      return `OVERBUDGET! You have spent ${spent} out of ${total}.`
    } else if (this.props.spent === this.props.total) {
      return `You have spent ${spent} out of ${total}.`
    } else {
      return `You have spent ${spent} out of ${total}. You
      have ${remaining} remaining this month.`
    }
  }

  renderUpdateForm() {
    this.setState({
      renderUpdateForm: !this.state.renderUpdateForm,
    })
  }

  callUpdateAction(budgetId, budgetInfo) {
    this.renderUpdateForm()
    this.props.updateAction(budgetId, budgetInfo)
    this.updateProgressBar(budgetInfo)
  }

  callDeleteAction() {
    this.props.deleteAction(this.props.budget.id)
  }

  render() {
    return (
      <div id={this.props.id}>
        {this.props.showButtons && (
          <div id="budgetButtons">
            <button
              type="button"
              className="btn btn-warning"
              onClick={this.renderUpdateForm}
            >
              Edit
            </button>{' '}
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.callDeleteAction}
            >
              Delete
            </button>
          </div>
        )}
        {this.state.renderUpdateForm && (
          <BudgetForm
            callUpdateAction={this.callUpdateAction}
            budget={this.props.budget}
          />
        )}
        <p>{this.renderMessage()}</p>
      </div>
    )
  }
}
