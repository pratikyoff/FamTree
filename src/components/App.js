import React, { useRef, useState, useLayoutEffect } from 'react'
import TitleBar from './TitleBar'
import TreeSpace from './TreeSpace'

import data from '../testData/famTree.json'

import '../css/App.css'

const App = props => {
  const [titleHeight, setTitleHeight] = useState(0)
  const titleRef = useRef(null)

  useLayoutEffect(() => {
    if (titleRef.current) { setTitleHeight(titleRef.current.offsetHeight) }
  }, [titleRef])

  return (
    <>
      <TitleBar ref={titleRef} />
      <TreeSpace data={data} titleHeight={titleHeight} />
    </>
  )
}

export default App
