import React, { useContext } from 'react'
import { ModalContext } from './ModalContext'

export default function ModalContainer() {
  const { modalNames, getModalState } = useContext(ModalContext)

  return (
    <>
      {modalNames.map((name, index) => {
        const { isOpen, component } = getModalState(name) ?? {
          isOpen: false,
          component: null,
        }

        if (isOpen) {
          return <React.Fragment key={index}>{component}</React.Fragment>
        } else {
          return null
        }
      })}
    </>
  )
}
