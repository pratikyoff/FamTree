import InfoPanel from './InfoPanel'
import Tree from './Tree'

const TreeAndPanel = props => {
  const { titleHeight = 0, rawTreeData, stratifiedFamilies, selectedFamily } = props

  return (
    <div style={{ height: `calc(100% - ${titleHeight}px)` }}>
      <Tree rawTreeData={rawTreeData} stratifiedFamilies={stratifiedFamilies} selectedFamily={selectedFamily} />
      <InfoPanel />
    </div>
  )
}

export default TreeAndPanel
