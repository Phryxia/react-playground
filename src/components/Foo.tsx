import 'src/styles/Foo.css'
import { useState, useEffect } from 'react'
import useModal from 'src/components/modal/useModal'
import useOutsideClickHandler from 'src/utilites/useOutsideClickHandler'

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
