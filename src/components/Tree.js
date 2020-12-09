import { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { hierarchy, tree } from 'd3-hierarchy'
import { zoom } from 'd3-zoom'

const Tree = props => {
  const svgRef = useRef(null)
  useEffect(() => createD3Chart(svgRef, props.data), [props.data])
  return (
    <svg ref={svgRef} height='100%' width='100%' />
  )
}

export default Tree

const nodeWidth = 150
const nodeHeight = 200

const createD3Chart = ({ current }, data) => {
  const dom = select(current)
  const rootNode = hierarchy(data)
  const famTree = tree(rootNode)
    .nodeSize([nodeWidth * 2, nodeHeight * 2])
    .separation((a, b) => b.data.spouse ? 1.5 : 1)
  const nodes = famTree(rootNode)

  const zoomBase = dom
    .append('g')

  // pan and zoom
  dom
    .call(zoom()
      .scaleExtent([0.2, 1.25])
      .on('zoom', ({ transform }) => zoomBase.attr('transform', transform)
      ))

  const initialTranslate = current.getBoundingClientRect().width / 2 - nodeWidth / 2
  const graphBase = zoomBase
    .append('g')
    .attr('transform', `translate(${initialTranslate},0)`)

  // border
  // base
  //   .append('g')
  //   .append('rect')
  //   .attr('x', 0)
  //   .attr('y', 0)
  //   .attr('width', graphWidth)
  //   .attr('height', graphHeight)
  //   .style('stroke', 'grey')
  //   .style('fill', 'none')

  const descendants = nodes.descendants()

  // node border
  graphBase
    .append('g')
    .selectAll('rect')
    .data(descendants)
    .join('rect')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .style('fill', 'none')
    .style('stroke', 'black')

  // paths
  graphBase
    .append('g')
    .selectAll('path')
    .data(nodes.links())
    .join('path')
    .style('stroke', 'blue')
    .style('fill', 'none')
    .attr('d', d => `
    M ${d.source.x + nodeWidth / 2} ${d.source.y + nodeHeight}
    V ${d.source.y + nodeHeight + (d.target.y - d.source.y - nodeHeight) / 2}
    H ${d.target.x + nodeWidth / 2}
    V ${d.target.y}
    `)

  // name
  graphBase
    .append('g')
    .selectAll('text')
    .data(descendants)
    .join('text')
    .attr('x', d => d.x)
    .attr('y', d => d.y + nodeWidth + 5)
    .text(d => d.data.name)

  // image
  graphBase
    .append('g')
    .selectAll('image')
    .data(descendants)
    .join('image')
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('width', nodeWidth)
    .attr('height', nodeWidth)
    .attr('href', 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png')

  // spouse --------------------------------------------------------------------------------------
  const spouseXOffset = nodeWidth + 20
  const spouseNodes = descendants.filter(d => d.data.spouse)
  graphBase
    .append('g')
    .selectAll('rect')
    .data(spouseNodes)
    .join('rect')
    .attr('x', d => d.x + spouseXOffset)
    .attr('y', d => d.y)
    .attr('width', nodeWidth)
    .attr('height', nodeHeight)
    .style('fill', 'none')
    .style('stroke', 'black')

  graphBase
    .append('g')
    .selectAll('path')
    .data(spouseNodes)
    .join('path')
    .style('stroke', 'red')
    .style('stroke-width', 2)
    .style('fill', 'none')
    .attr('d', d => `M ${d.x + nodeWidth} ${d.y + nodeHeight / 2} h 20`)

  // spouse name
  graphBase
    .append('g')
    .selectAll('text')
    .data(spouseNodes)
    .join('text')
    .attr('x', d => d.x + spouseXOffset)
    .attr('y', d => d.y + nodeWidth + 5)
    .text(d => d.data.spouse.name)

  // image
  graphBase
    .append('g')
    .selectAll('image')
    .data(spouseNodes)
    .join('image')
    .attr('x', d => d.x + spouseXOffset)
    .attr('y', d => d.y)
    .attr('width', nodeWidth)
    .attr('height', nodeWidth)
    .attr('href', 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png')
}
