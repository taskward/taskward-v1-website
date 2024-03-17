import { useEffect } from 'react'
import clsx from 'clsx'

import styles from './styles.module.css'

import { ModalProps } from '@/interfaces'
import { useDetectOutsideClick } from '@/hooks'

export default function Modal({
  children,
  show,
  toggle,
  closeModalCallback,
  modalClassName,
  backgroundClassName
}: ModalProps): JSX.Element | null {
  const outsideClickRef = useDetectOutsideClick({
    active: show,
    outsideClickCallback: () => {
      handleCloseModal()
    }
  })

  useEffect(() => {
    if (show) {
      window.addEventListener('keydown', handleOnKeyDownEsc)
      return () => {
        window.removeEventListener('keydown', handleOnKeyDownEsc)
      }
    }
  }, [show])

  const handleOnKeyDownEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal()
    }
  }

  const handleCloseModal = async () => {
    if (closeModalCallback) {
      await closeModalCallback()
    }
    if (toggle) {
      toggle()
    }
  }

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex h-full w-full bg-black bg-opacity-60 px-4 transition-[visibility,opacity]',
        show ? 'visible opacity-100' : 'invisible opacity-0',
        backgroundClassName
      )}
    >
      <div
        ref={outsideClickRef}
        className={clsx(
          'z-[55] mb-auto mt-20 max-h-[520px] overflow-y-auto rounded-md bg-white p-4 shadow-lg transition-[transform,visibility,opacity] dark:bg-gray-700 sm:mx-auto',
          styles.modalWrapper,
          show ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0',
          modalClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
