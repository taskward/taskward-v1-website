import { type SvgProps } from ".";
import { useTranslation } from "react-i18next";

export default function Menu({
  width = "24",
  height = "24",
  className = "fill-black",
  onClick,
}: SvgProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <div title={t("HEADER.MENU")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        className={className}
        onClick={onClick}
      >
        <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
      </svg>
    </div>
  );
}
