import { forwardRef } from 'react'
import Button from 'react-bootstrap/Button'

const TitleBar = forwardRef((props, ref) => {
  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <span style={{ fontWeight: 'bold', marginRight: 'auto' }}>FamTree</span>
      <Button>Log In</Button>
    </div>
  )
})

export default TitleBar
