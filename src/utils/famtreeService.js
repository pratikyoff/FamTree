import axios from 'axios'
import { getToken, setToken } from './tokenStore'

const baseUrl = 'https://famtreeserver.herokuapp.com'

export const login = async (username, password) => {
  const { data: { token } } = await axios.post(`${baseUrl}/login`, { username, password })
  setToken(token)
}

export const getAllFamilyMembers = async () => {
  const token = getToken()
  const { data } = await axios.get(`${baseUrl}/family/all`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}
