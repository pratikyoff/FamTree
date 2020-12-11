/* global localStorage, atob */

export const setToken = token => localStorage.setItem('token', token)

export const getToken = () => localStorage.getItem('token')

export const getTokenData = () => {
  const token = getToken()
  return JSON.parse(atob(token.split('.')[1]))
}
