import axios from 'axios'
import { getToken, setToken, getTokenData } from './tokenStore'
import { filter, find } from 'lodash'

import { stratify } from 'd3-hierarchy'

const baseUrl = 'http://localhost:3001' // 'https://famtreeserver.herokuapp.com'

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

const findParentRecursively = (user, rawData) => {
  if (user.father) return findParentRecursively(find(rawData, rd => rd.key === user.father), rawData)
  if (user.mother) return findParentRecursively(find(rawData, rd => rd.key === user.mother), rawData)
  return user
}

export const fetchAndSetFamilies = (setRawTreeData, setStratifiedFamilies, setSelectedFamily) => {
  getAllFamilyMembers().then(rawData => {
    setRawTreeData(rawData)
    const user = getTokenData()
    const stratifiedArray = []
    for (const userFamilyKey of user.family) {
      const filteredRawData = filter(rawData, rd => rd.family.includes(userFamilyKey))

      const stratifyOp = stratify()
        .id(d => d.key)
        .parentId(d => {
          if (d.father) {
            const father = find(rawData, rd => rd.key === d.father)
            if (father.family.includes(userFamilyKey)) return d.father
          }

          if (d.mother) {
            const mother = find(rawData, rd => rd.key === d.mother)
            if (mother.family.includes(userFamilyKey)) return d.mother
          }

          return null
        })

      const root = stratifyOp(filteredRawData)
      stratifiedArray.push(root)
    }
    const rootNode = findParentRecursively(user, rawData)
    const selectedFam = rootNode.key
    setSelectedFamily(selectedFam)
    setStratifiedFamilies(stratifiedArray)
  })
}
