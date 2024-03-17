import clsx from 'clsx'

import { useAppSelector } from '@/hooks'

export default function Notification(): JSX.Element {
  const show = useAppSelector((state) => state.notification.show)
  const text = useAppSelector((state) => state.notification.text)

  return (
    <div
      className={clsx(
        'fixed bottom-10 left-20 z-50 m-auto h-fit w-fit rounded-md bg-emerald-600 p-2 text-sm font-medium text-white shadow-lg transition-[opacity,transform,visibility] duration-300',
        show && text ? 'visible scale-100 opacity-100' : 'invisible scale-0 opacity-0'
      )}
    >
      {text}
    </div>
  )
}
