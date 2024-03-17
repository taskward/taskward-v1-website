import clsx from 'clsx'

import { Icon } from '@/components'
import { LoadingProps } from '@/interfaces'

export default function Loading({
  fullScreen = false,
  width = '36',
  height = '36',
  className,
  style
}: LoadingProps): JSX.Element {
  if (fullScreen) {
    return (
      <div
        className={clsx('h-screen w-screen', className)}
        style={style}
      >
        <div className="flex h-full w-full items-center justify-center">
          <Icon.Loading
            width={width}
            height={height}
          />
        </div>
      </div>
    )
  }
  return (
    <div
      className={clsx('flex h-full w-full items-center justify-center', className)}
      style={style}
    >
      <Icon.Loading
        width={width}
        height={height}
      />
    </div>
  )
}
