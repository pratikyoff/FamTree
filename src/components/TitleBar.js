import { forwardRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { login } from '../utils/famtreeService'

const TitleBar = forwardRef((props, ref) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <>
      <div ref={ref} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontWeight: 'bold', marginRight: 'auto', fontSize: '20px' }}>FamTree</span>
        <Button onClick={() => setShowLoginModal(true)}>Log In</Button>
      </div>
      <Modal show={showLoginModal} centered>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Enter email' value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant='primary' onClick={() => login(username, password)}>
              Login
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
    </>
  )
})

export default TitleBar
