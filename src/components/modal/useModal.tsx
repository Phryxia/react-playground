import { useContext } from 'react'
import { ModalContext } from './ModalContext'

export default function useModal(name: string) {
  const { getModalState, setModalState } = useContext(ModalContext)

  function openModal(component: JSX.Element) {
    setModalState(name, true, component)
  }

  function closeModal() {
    setModalState(name, false)
  }

  return {
    openModal,
    closeModal,
    isModalOpen: getModalState(name)?.isOpen ?? false,
  }
}
