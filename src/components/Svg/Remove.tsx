import { type SvgPropsType } from ".";

export default function Remove({
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
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  );
}

// Google Material Icons - Remove
