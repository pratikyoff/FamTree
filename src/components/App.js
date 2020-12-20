import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import TitleBar from './TitleBar'
import Tree from './Tree'
import InfoPanel from './InfoPanel'
import { fetchAndSetFamilies } from '../utils/famtreeService'
import { isEmpty } from 'lodash'

import '../css/App.css'

const App = props => {
  const [titleHeight, setTitleHeight] = useState(0)
  const titleRef = useRef(null)
  const [panelHeight, setPanelHeight] = useState(0)
  const panelRef = useRef(null)

  const [rawTreeData, setRawTreeData] = useState({})
  const [stratifiedFamilies, setStratifiedFamilies] = useState([])
  const [selectedFamily, setSelectedFamily] = useState('')
  const [selectedKey, setSelectedKey] = useState()
  useEffect(() => {
    if (!isEmpty(rawTreeData)) return
    fetchAndSetFamilies(setRawTreeData, setStratifiedFamilies, setSelectedFamily)
  }, [])

  useLayoutEffect(() => {
    if (titleRef.current) { setTitleHeight(titleRef.current.offsetHeight) }
    if (panelRef.current) { setPanelHeight(panelRef.current.offsetHeight) }
  }, [titleRef, panelRef])

  return (
    <>
      <TitleBar
        ref={titleRef}
        setRawTreeData={setRawTreeData}
        stratifiedFamilies={stratifiedFamilies}
        setStratifiedFamilies={setStratifiedFamilies}
        selectedFamily={selectedFamily}
        setSelectedFamily={setSelectedFamily}
      />
      <Tree
        rawTreeData={rawTreeData}
        stratifiedFamilies={stratifiedFamilies}
        selectedFamily={selectedFamily}
        heightOffset={titleHeight + panelHeight}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
      <InfoPanel
        ref={panelRef}
        rawTreeData={rawTreeData}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
        setPanelHeight={setPanelHeight}
      />
    </>
  )
}

export default App
