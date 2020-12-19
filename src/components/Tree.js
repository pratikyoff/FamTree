import { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { tree } from 'd3-hierarchy'
import { zoom } from 'd3-zoom'
import { find, isEmpty } from 'lodash'

const Tree = props => {
  const { heightOffset = 0, rawTreeData, stratifiedFamilies, selectedFamily } = props

  const svgRef = useRef(null)
  useEffect(() => {
    if (isEmpty(rawTreeData) || isEmpty(stratifiedFamilies) || isEmpty(selectedFamily)) return
    createD3Chart(svgRef, rawTreeData, stratifiedFamilies, selectedFamily)
  }, [rawTreeData, stratifiedFamilies, selectedFamily])
  return (
    <div style={{ height: `calc(100% - ${heightOffset}px)` }}>
      <svg ref={svgRef} height='100%' width='100%' />
    </div>
  )
}

export default Tree

const nodeWidth = 150
const nodeHeight = 200

const createD3Chart = ({ current }, rawTreeData, stratifiedFamilies, selectedFamily) => {
  const dom = select(current)
  dom.selectAll('*').remove()
  const rootNode = find(stratifiedFamilies, sf => sf.id === selectedFamily)
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
    .attr('class', d => d.data.gender)

  // paths
  graphBase
    .append('g')
    .selectAll('path')
    .data(nodes.links())
    .join('path')
    .style('stroke', 'blue')
    .style('stroke-width', '2px')
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
    .attr('x', d => d.x + 10)
    .attr('y', d => d.y + nodeWidth + 20)
    .text(d => d.data.name)
    .style('font-weight', '500')

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
    .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/240px-Solid_black.svg.png')

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
    .attr('class', d => find(rawTreeData, des => des.key === d.data.spouse).gender)

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
    .attr('x', d => d.x + spouseXOffset + 10)
    .attr('y', d => d.y + nodeWidth + 20)
    .text(d => find(rawTreeData, rtd => rtd.key === d.data.spouse).name)
    .style('font-weight', '500')

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
    .attr('href', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/240px-Solid_black.svg.png')
}
