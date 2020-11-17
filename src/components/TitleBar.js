import Button from 'react-bootstrap/Button'

const TitleBar = props => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span style={{ fontWeight: 'bold', marginRight: 'auto' }}>FamTree</span>
      <Button>Log In</Button>
    </div>
  )
}

export default TitleBar
