import { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { hierarchy, tree } from 'd3-hierarchy'

const Tree = props => {
  const svgRef = useRef(null)
  useEffect(() => createD3Chart(svgRef, props.data), [props.data])
  return (
    <svg ref={svgRef} height='100%' width='100%' />
  )
}

export default Tree

const nodeWidth = 50
const nodeHeight = 50
const graphWidth = 1000
const graphHeight = 300

const createD3Chart = ({ current }, data) => {
  const dom = select(current)
  const rootNode = hierarchy(data)
  const famTree = tree(rootNode).size([graphWidth, graphHeight - nodeHeight])
  const nodes = famTree(rootNode)

  //border
  dom
  .append('g')
  .append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .style('stroke', 'grey')
  .style('fill', 'none')

  //nodes
  dom
  .append('g')
    .selectAll('rect')
    .data(nodes.descendants())
    .join('rect')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .style('fill', 'none')
    .style('stroke', 'black')

  dom
  .append('g')
    .selectAll('path')
    .data(nodes.links())
    .join('path')
    .style('stroke', 'blue')
    .style('fill', 'none')
    .attr('d', d =>  `M ${d.source.x + nodeWidth / 2} ${d.source.y + nodeHeight}
    V ${d.source.y + nodeHeight + (d.target.y - d.source.y - nodeHeight) / 2}
    H ${d.target.x + nodeWidth/2}
    V ${d.target.y}
    `)
}
