import type { CSSProperties, HTMLInputTypeAttribute } from "react";

interface ComponentProps {
  className: string;
  style: CSSProperties;
}

type CustomComponentProps = Partial<ComponentProps>;

interface InputProperties {
  type: HTMLInputTypeAttribute;
  title: string;
  placeholder: string;
  required: boolean;
}

type InputProps = Partial<InputProperties> & CustomComponentProps;

export type { CustomComponentProps, InputProps };
