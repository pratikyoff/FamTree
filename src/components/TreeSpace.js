import ScrollContainer from 'react-indiana-drag-scroll'

const TreeSpace = props => {
  return (
    <ScrollContainer style={{ height: '100%' }}>
      {'This is the actual tree space.'.repeat(1000)}
    </ScrollContainer>
  )
}

export default TreeSpace
