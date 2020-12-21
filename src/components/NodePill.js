import Badge from 'react-bootstrap/Badge'

const NodePill = props => {
  const { text, clickFn } = props
  return (
    <Badge
      variant='warning'
      pill
      style={{ marginLeft: '3px', fontSize: '0.9em', cursor: 'pointer' }}
      onClick={clickFn}
    >
      {text}
    </Badge>
  )
}

export default NodePill
