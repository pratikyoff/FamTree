import { find, isEmpty } from 'lodash'
import { forwardRef, useLayoutEffect } from 'react'

const InfoPanel = forwardRef((props, ref) => {
  const { rawTreeData, selectedKey, setPanelHeight } = props

  useLayoutEffect(() => {
    if (ref.current) { setPanelHeight(ref.current.offsetHeight) }
  })

  if (isEmpty(selectedKey)) return null
  const selected = find(rawTreeData, rtd => rtd.key === selectedKey)
  return (
    <div ref={ref}>
      {JSON.stringify( selected)}
    </div>
  )
})

export default InfoPanel
