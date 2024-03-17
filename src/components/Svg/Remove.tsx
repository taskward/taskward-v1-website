import { type SvgPropsType } from '.'
import clsx from 'clsx'

export default function Remove({
  width = '24',
  height = '24',
  className,
  onClick
}: SvgPropsType): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={clsx('fill-black', className)}
      onClick={onClick}
    >
      <path
        d="M0 0h24v24H0V0z"
        fill="none"
      />
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  )
}

// Google Material Icons - Remove
