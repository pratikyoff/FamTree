import React, { useRef, useState, useLayoutEffect } from 'react'
import TitleBar from './TitleBar'
import TreeAndPanel from './TreeAndPanel'

import data from '../testData/famTree.json'

import '../css/App.css'

const App = props => {
  const [titleHeight, setTitleHeight] = useState(0)
  const titleRef = useRef(null)

  useLayoutEffect(() => {
    if (titleRef.current) { setTitleHeight(titleRef.current.offsetHeight) }
  }, [])

  return (
    <>
      <TitleBar ref={titleRef} />
      <TreeAndPanel data={data} titleHeight={titleHeight} />
    </>
  )
}

export default App
