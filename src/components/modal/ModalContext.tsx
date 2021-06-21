import React, { useState } from 'react'

interface ModalState {
  isOpen: boolean
  component: JSX.Element
}

interface ModalContextInterface {
  modalNames: string[]
  getModalState: (name: string) => ModalState | undefined
  setModalState: (
    name: string,
    isOpen: boolean,
    component?: JSX.Element
  ) => void
}

export const ModalContext = React.createContext<ModalContextInterface>({
  modalNames: [],
  getModalState: (name: string) => undefined,
  setModalState: (name: string, isOpen: boolean, component?: JSX.Element) => {},
})

// 모달 상태를 관리하는 Context Provider
export default function ModalProvider({
  children,
}: {
  children?: React.ReactChild
}) {
  const [modalStates, setModalStates] = useState<{
    [name: string]: ModalState
  }>({})

  // 존재하는 모달의 이름들을 반환한다.
  function getModalNames() {
    const result = []
    for (const name in modalStates) {
      result.push(name)
    }
    return result
  }

  // 특정 모달의 활성화 정보를 반환한다.
  function getModalState(name: string): ModalState | undefined {
    return modalStates[name]
  }

  // 특정 모달의 활성화 여부를 조작한다.
  function setModalState(
    name: string,
    isOpen: boolean,
    component?: JSX.Element
  ) {
    setModalStates({
      ...modalStates,
      [name]: {
        isOpen,
        component: component ?? modalStates[name]?.component ?? <></>,
      },
    })
  }

  return (
    <ModalContext.Provider
      value={{
        modalNames: getModalNames(),
        getModalState,
        setModalState,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}
