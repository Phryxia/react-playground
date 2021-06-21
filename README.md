# React Playground

리액트 혼자서 작업하면서 유용하다고 생각되는 것들을 잡다하게 모은 저장소

## Featured Snippets

### General Modal System

Context API를 사용한 간단한 모달 관리 시스템을 만들었다. 이 시스템을 사용하려면 몇 가지 준비가 필요하다.

우선 `src/components/modal` 폴더의 소스코드를 적당히 복사한 뒤, 트리 최상단에서 `ModalProvider`로 페이지를 담당할 컴포넌트들을 감싸준다.

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ModalProvider from './components/modal/ModalContext'

ReactDOM.render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

그런 뒤, 적당한 컴포넌트에 다음과 같이 `ModalContainer`를 배치한다.

```tsx
import ModalContainer from './modal/ModalContainer'

export default function App() {
  return (
    <>
      <h1>Hello World!</h1>
      <ModalContainer />
    </>
  )
}
```

그 다음부터는 모달에 사용할 이름을 정한 뒤, `useModal` 커스텀 훅을 사용하여 자유롭게 모달을 열고 닫으면 된다. `useModal`은 3개의 필드를 제공하는데, 지정된 모달을 열고 닫는 것과, 모달이 열려있는지 여부를 반환한다.

```tsx
import ModalContainer from './modal/ModalContainer'
import useModal from './modal/useModal'
import Foo from './Foo'

export default function App() {
  const { openModal, closeModal, isModalOpen } = useModal('foo')

  function handleFooClick() {
    if (isModalOpen) {
      closeModal()
    } else {
      openModal(<Foo />)
    }
  }

  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={handleFooClick}>Foo</button>
      <ModalContainer />
    </>
  )
}
```

### `useOutsideClickHandler`

모달을 개발하다보면 밖을 클릭했을 때 모달을 닫는 로직을 자주 짜게 된다. 이렇게 특정 DOM의 바깥을 클릭했을 때의 이벤트를 처리하기 위한 커스텀 훅을 만들어보았다.

`useRef` 쓰는 느낌으로 기준이 되는 DOM의 ref를 지정하기만 하면 된다. 이때 정확한 타이핑을 위해 기준이 되는 엘레먼트의 타입을 제네릭으로 넣어줘야 한다.

```tsx
export default function Foo() {
  const [count, setCount] = useState<number>(0)
  const { closeModal } = useModal('foo')

  // 바깥을 클릭하면 창이 닫히기 전의 카운트를 알림으로 띄운다.
  const domRef = useOutsideClickHandler<HTMLDivElement>(() => {
    alert(`Last count was ${count}`)
    closeModal()
  })

  // 1초에 카운트 하나씩 올린다.
  useEffect(() => {
    function tick() {
      setCount((count) => count + 1)
    }
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="foo" ref={domRef}>
      <div>I'm Foo!</div>
      <div>{count}</div>
    </div>
  )
}
```

이벤트 핸들러는 `Event` 타입의 인자를 사용할 수 있다. React에서 자주 사용되는 `SyntheticEvent`가 아님에 주의하자.
