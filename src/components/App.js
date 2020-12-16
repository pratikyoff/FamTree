import React, { useRef, useState, useLayoutEffect } from 'react'
import TitleBar from './TitleBar'
import TreeAndPanel from './TreeAndPanel'
import { getAllFamilyMembers } from '../utils/famtreeService'
import { filter, find, isEmpty } from 'lodash'
import { getTokenData } from '../utils/tokenStore'
import { stratify } from 'd3-hierarchy'

import '../css/App.css'

const App = props => {
  const [titleHeight, setTitleHeight] = useState(0)
  const titleRef = useRef(null)

  const [rawTreeData, setRawTreeData] = useState({})
  const [stratifiedFamilies, setStratifiedFamilies] = useState([])
  const [selectedFamily, setSelectedFamily] = useState('')
  if (isEmpty(rawTreeData)) {
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
      console.log(stratifiedArray)
      setStratifiedFamilies(stratifiedArray)
    })
  }

  useLayoutEffect(() => {
    if (titleRef.current) { setTitleHeight(titleRef.current.offsetHeight) }
  }, [])

  return (
    <>
      <TitleBar
        ref={titleRef}
        stratifiedFamilies={stratifiedFamilies}
        selectedFamily={selectedFamily}
        setSelectedFamily={setSelectedFamily}
      />
      <TreeAndPanel
        rawTreeData={rawTreeData}
        stratifiedFamilies={stratifiedFamilies}
        selectedFamily={selectedFamily}
        titleHeight={titleHeight}
      />
    </>
  )
}

const findParentRecursively = (user, rawData) => {
  if (user.father) return findParentRecursively(find(rawData, rd => rd.key === user.father), rawData)
  if (user.mother) return findParentRecursively(find(rawData, rd => rd.key === user.mother), rawData)
  return user
}

export default App
