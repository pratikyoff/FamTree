import InfoPanel from './InfoPanel'
import Tree from './Tree'

const TreeAndPanel = props => {
  const { titleHeight = 0, data } = props
  return (
    <div style={{ height: `calc(100% - ${titleHeight}px)` }}>
      <Tree data={data} />
      <InfoPanel />
    </div>
  )
}

export default TreeAndPanel
