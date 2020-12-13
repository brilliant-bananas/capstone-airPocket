import React, {createRef} from 'react'
import * as d3 from 'd3'

export default class DonutChart extends React.Component {
  constructor(props) {
    super(props)
    const dataArr = this.getMonthlyTotal()
    this.state = {
      width: 360,
      height: 360,
      innerRadius: 70,
      outerRadius: 120,
    }
    this.ref = createRef()
    this.createPie = d3
      .pie()
      .value((d) => d.cost)
      .sort(null)
    this.createArc = d3
      .arc()
      .innerRadius(this.state.innerRadius)
      .outerRadius(this.state.outerRadius)
    this.colors = d3
      .scaleOrdinal()
      .domain(dataArr)
      .range(['#8ac408', '#0ccaca', '#00c20c', '#a7e218', '#2EC771'])
    this.format = d3.format('.2f')
  }

  componentDidMount() {
    const svg = d3.select(this.ref.current)
    // const data = this.createPie(this.props.data)

    const data = this.createPie(this.getMonthlyTotal())
    const {width, height, innerRadius, outerRadius} = this.state

    svg.attr('class', 'chart').attr('width', width).attr('height', height)

    const group = svg
      .append('g')
      .attr('transform', `translate(${outerRadius + 60} ${outerRadius + 30})`)

    const groupWithEnter = group.selectAll('g.arc').data(data).enter()

    const path = groupWithEnter.append('g').attr('class', 'arc')

    path
      .append('path')
      .attr('class', 'arc')
      .attr('d', this.createArc)
      .attr('fill', (d, i) => this.colors(d.index))

    path
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', 'black')
      .style('font-size', 10)
      .text((d) => {
        return d.data.category + ': ' + d.data.cost
      })
  }

  getMonthlyTotal() {
    const today = new Date()
    const monthNum = today.getMonth() + 1
    const {transactions} = this.props
    const monthlyTransacts = transactions.filter((transact) => {
      let dateArr = transact.date.split('-')
      let month = parseInt(dateArr[1])
      return month === monthNum
    })
    const costPerCategory = {}
    for (let i = 0; i < monthlyTransacts.length; i++) {
      let category = monthlyTransacts[i].category.name
      let costPerTrans = Number(monthlyTransacts[i].amount)
      if (costPerCategory[category]) {
        costPerCategory[category] += costPerTrans
      } else {
        costPerCategory[category] = costPerTrans
      }
    }

    const dataArr = []
    for (let [key, value] of Object.entries(costPerCategory)) {
      const transObj = {category: key, cost: value}
      dataArr.push(transObj)
    }
    return dataArr
  }

  componentDidUpdate() {
    let transactions = this.props.transactions

    if (!transactions.length) {
      return
    }

    const svg = d3.select(this.ref.current)
    const data = this.createPie(this.getMonthlyTotal())

    const group = svg.select('g').selectAll('g.arc').data(data)

    group.exit().remove()

    const groupWithUpdate = group.enter().append('g').attr('class', 'arc')

    const path = groupWithUpdate.append('path').merge(group.select('path.arc'))

    path
      .attr('class', 'arc')
      .attr('d', this.createArc)
      .attr('fill', (d, i) => this.colors(i))

    const text = groupWithUpdate.append('text').merge(group.select('text'))

    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', (d) => {
        let centroid = this.createArc.centroid(d)
        return `translate(${centroid[0] * 1.2}, ${centroid[1] * 1.2})`
      })
      // .text((d) => this.format())
      .text((d) => {
        return `${d.data.category}: $${this.format(parseInt(d.data.cost))}`
      })
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
          marginTop: '32px',
        }}
      >
        <svg ref={this.ref} className="donut-chart" />
      </div>
    )
  }
}
