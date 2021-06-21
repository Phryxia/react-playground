import ModalContainer from './modal/ModalContainer'
import useModal from './modal/useModal'
import Foo from './Foo'
import Bar from './Bar'

// 간단한 예제: 버튼을 누르면 각각에 맞는 모달을 열거나 닫는다.
export default function App() {
  const {
    openModal: openFoo,
    closeModal: closeFoo,
    isModalOpen: isFooOpen,
  } = useModal('foo')

  const {
    openModal: openBar,
    closeModal: closeBar,
    isModalOpen: isBarOpen,
  } = useModal('bar')

  function handleFooClick() {
    if (isFooOpen) {
      closeFoo()
    } else {
      openFoo(<Foo />)
    }
  }

  function handleBarClick() {
    if (isBarOpen) {
      closeBar()
    } else {
      openBar(<Bar />)
    }
  }

  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={handleFooClick}>Foo</button>
      <button onClick={handleBarClick}>Bar</button>
      <ModalContainer />
    </>
  )
}
