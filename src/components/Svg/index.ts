export type SvgProps = {
  width?: string;
  height?: string;
  fill?: string;
  svgClassName?: string;
  onClick?: () => void;
};

import Archive from "./Archive";
import Bulb from "./Bulb";
import Language from "./Language";
import Moon from "./Moon";
import Sun from "./Sun";
import Trash from "./Trash";

export const Icon = {
  Archive,
  Bulb,
  Language,
  Moon,
  Sun,
  Trash,
};
