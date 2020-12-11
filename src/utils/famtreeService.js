import axios from 'axios'
import { setToken } from './tokenStore'

const baseUrl = 'https://famtreeserver.herokuapp.com'

export const login = async (username, password) => {
  const { data: { token } } = await axios.post(`${baseUrl}/login`, { username, password })
  setToken(token)
}
