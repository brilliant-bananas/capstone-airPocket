import React, {Component} from 'react'
import * as d3 from 'd3'

export default class BarChart extends Component {
  componentDidMount() {
    this.drawChart()
  }

  drawChart() {
    console.log('Bar chart Props', this.props)

    const svg = d3
      .select('#' + this.props.id)
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height)

    // const segmentWidth = Number(this.props.total) / 5
    const segmentWidth = 350

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
      .attr('fill', 'green')
      .attr('height', 15)
      .attr('width', 0)
      .attr('rx', 10)
      .attr('ry', 10)
      .attr('x', 0)

    const spent = this.props.spent / this.props.total

    progress
      .transition()
      .duration(1000)
      .attr('width', function () {
        return segmentWidth * spent
      })
  }

  moveProgressBar(state) {
    progress
      .transition()
      .duration(1000)
      .attr('fill', 'green')
      .attr('width', function () {
        return 10
      })
  }

  render() {
    return <div id={this.props.id}></div>
  }
}
