import { isEmpty } from 'lodash'

const { localStorage, atob } = global

export const setToken = token => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const getTokenData = () => {
  const token = getToken()
  if (isEmpty(token)) return
  return JSON.parse(atob(token.split('.')[1]))
}
