import { filter, find, isEmpty, map } from 'lodash'
import { forwardRef, useLayoutEffect } from 'react'
import dayjs from 'dayjs'
import NodePill from './NodePill'

const InfoPanel = forwardRef((props, ref) => {
  const { rawTreeData, selectedKey, setPanelHeight, setSelectedKey } = props

  useLayoutEffect(() => {
    if (ref.current) return setPanelHeight(ref.current.offsetHeight)
    setPanelHeight(0)
  })

  if (isEmpty(selectedKey)) return null
  const selected = find(rawTreeData, rtd => rtd.key === selectedKey)
  const father = find(rawTreeData, rtd => rtd.key === selected.father)
  const mother = find(rawTreeData, rtd => rtd.key === selected.mother)
  const childrenArray = filter(rawTreeData, rtd => rtd.father === selectedKey || rtd.mother === selectedKey)
  const spouse = find(rawTreeData, rtd => rtd.key === selected.spouse)
  return (
    <div
      ref={ref}
      style={{
        maxHeight: '300px',
        height: '70%',
        display: 'flex',
        padding: '5px 10px 5px 10px',
        boxShadow: '5px -5px 10px 0px rgba(50, 50, 50, 0.75)',
        position: 'relative',
        flexWrap: 'wrap',
        overflowY: 'auto'
      }}
    >
      <div style={{ display: 'flex', maxWidth: '300px', maxHeight: '280px', flexGrow: '1', padding: '15px' }}>
        <img style={{ width: '100%', height: '100%' }} src={selected.image || 'https://www.flaticon.com/svg/static/icons/svg/660/660252.svg'} />
      </div>
      <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column', padding: '10px', justifyContent: 'space-around' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ height: '30px', width: '30px', marginRight: '5px' }} src='user.png' />
          {selected.name}
        </div>
        {!selected.deceased &&
          <div>
            <img style={{ height: '30px', width: '30px', marginRight: '5px' }} src='age.png' />
            {Math.trunc((new Date() - new Date(selected.dob)) / (1000 * 60 * 60 * 24 * 365.25))} years
          </div>}
        <div>
          <img style={{ height: '30px', width: '30px', marginRight: '5px' }} src='dob.png' />
          {dayjs(selected.dob).format('DD MMMM YYYY')}
        </div>
        {selected.dod &&
          <div>
            <img style={{ height: '30px', width: '30px', marginRight: '5px' }} src='dod.png' />
            {dayjs(selected.dod).format('DD MMMM YYYY')}
          </div>}
        {(selected.mother || selected.father) &&
          <div style={{ display: 'flex' }}>
            <img style={{ height: '30px', width: '30px', marginRight: '5px' }} src='parents.svg' />
            <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              {father && <NodePill clickFn={() => setSelectedKey(father.key)} text={father.name} />}
              {mother && <NodePill clickFn={() => setSelectedKey(mother.key)} text={mother.name} />}
            </div>
          </div>}
        {!isEmpty(childrenArray) &&
          <div style={{ display: 'flex' }}>
            <img style={{ height: '30px', width: '30px', marginRight: '5px' }} src='kid.svg' />
            <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              {map(childrenArray, ca => <NodePill text={ca.name} clickFn={() => setSelectedKey(ca.key)} />)}
            </div>
          </div>}
        {spouse &&
          <div style={{ display: 'flex' }}>
            <img style={{ height: '30px', width: '30px', marginRight: '5px' }} src='spouse.png' />
            <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <NodePill text={spouse.name} clickFn={() => setSelectedKey(spouse.key)} />
            </div>
          </div>}
      </div>
      <div style={{ flexGrow: '1', display: 'flex', flexDirection: 'column' }}>
        <div>Phone(s)</div>
        <div>Whatsapp</div>
        <div>Facebook</div>
        <div>Instagram</div>
        <div>Email</div>
      </div>
      <div style={{ flexGrow: '1' }}>
        <div>Add Parent</div>
        <div>Add Children</div>
        <div>Edit Info</div>
      </div>
      <div style={{ position: 'absolute', right: '3px', top: '2px' }} onClick={() => setSelectedKey('')}>
        <img style={{ width: '24px' }} src='https://www.flaticon.com/svg/static/icons/svg/660/660252.svg' />
      </div>
    </div>
  )
})

export default InfoPanel
