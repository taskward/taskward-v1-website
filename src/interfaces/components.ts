import { CSSProperties } from "react";

interface ComponentProps {
  className: string;
  style: CSSProperties;
}

type CustomComponentProps = Partial<ComponentProps>;

export type { CustomComponentProps };
