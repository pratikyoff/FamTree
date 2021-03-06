import { forwardRef, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { fetchAndSetFamilies, login } from '../utils/famtreeService'
import { find, isEmpty, map } from 'lodash'
import { getTokenData, setToken } from '../utils/tokenStore'

const TitleBar = forwardRef((props, ref) => {
  const { setRawTreeData, stratifiedFamilies, setStratifiedFamilies, selectedFamily, setSelectedFamily } = props
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = getTokenData()
  return (
    <div ref={ref}>
      <Navbar bg='light' variant='light' expand='lg'>
        <Navbar.Brand>FamTree</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='justify-content-end' style={{ width: '100%' }}>
            <NavDropdown
              title={selectedFamily && !isEmpty(stratifiedFamilies)
                ? find(stratifiedFamilies, sf => sf.id === selectedFamily).data.name
                : 'Family Root'}
              id='basic-nav-dropdown'
              onSelect={key => setSelectedFamily(key)}
              style={{ marginRight: '5px' }}
            >
              <NavDropdown.Item disabled>
                <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                  Family Root
                </div>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {stratifiedFamilies && map(stratifiedFamilies,
                sf => <NavDropdown.Item key={sf.id} eventKey={sf.id} active={sf.id === selectedFamily}>{sf.data.name}</NavDropdown.Item>)}
            </NavDropdown>
            {user
              ? <>
                <Navbar.Text>{user.name}</Navbar.Text>
                <Button
                  variant='outline-danger'
                  size='sm'
                  style={{ marginLeft: '5px' }}
                  onClick={() => {
                    setToken('')
                    window.location.reload()
                  }}
                >
                  Log Out
                </Button>
                {/* eslint-disable-next-line */}
              </>
              : <Button
                  variant='outline-success'
                  onClick={() => setShowLoginModal(true)}
                >
                Log In
                {/* eslint-disable-next-line */}
              </Button>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={showLoginModal} centered>
        <Modal.Body>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='text' placeholder='Email' value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button
              variant='primary' onClick={() => login(username, password).then(() => {
                setShowLoginModal(false)
                fetchAndSetFamilies(setRawTreeData, setStratifiedFamilies, setSelectedFamily)
              })}
            >
              Login
            </Button>
          </Form>

        </Modal.Body>
      </Modal>
    </div>
  )
})

export default TitleBar
