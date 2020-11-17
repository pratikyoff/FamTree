import React, { useState, useLayoutEffect, useRef } from 'react'
import TitleBar from './TitleBar'
import TreeSpace from './TreeSpace'
import tree from '../testData/famTree.json'

const App = props => {
  const [height, setHeight] = useState(0)
  const titleBarRef = useRef(null)

  useLayoutEffect(() => {
    setHeight(titleBarRef.clientHeight)
  })

  return (
    <>
      <TitleBar ref={titleBarRef}/>
      {height+'height'}
      <TreeSpace tree={tree} />
    </>
  )
}

export default App
