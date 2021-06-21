import 'src/styles/Bar.css'
import useModal from 'src/components/modal/useModal'
import useOutsideClickHandler from 'src/utilites/useOutsideClickHandler'

export default function Bar() {
  const { closeModal } = useModal('bar')
  const domRef = useOutsideClickHandler<HTMLDivElement>(closeModal)
  return (
    <div className="bar" ref={domRef}>
      I'm Bar!
    </div>
  )
}
