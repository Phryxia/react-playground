import { useRef, useEffect } from 'react'

// 바깥을 클릭하면 핸들러가 실행된다.
export default function useOutsideClickHandler<ElementType extends Node>(
  onOutsideClick: (event: Event) => void
) {
  const domRef = useRef<ElementType>(null)

  useEffect(() => {
    function handleGlobalClick(event: Event) {
      const clickedDom = event.target as Element
      if (domRef.current && !domRef.current.contains(clickedDom)) {
        onOutsideClick(event)
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [onOutsideClick])

  return domRef
}
