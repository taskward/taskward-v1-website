import { type SvgPropsType } from ".";

export default function More({
  width = "24",
  height = "24",
  className = "fill-black",
  onClick,
}: SvgPropsType): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

// Google Material Icons - More Horizontal
