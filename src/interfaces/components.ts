import type { CSSProperties, HTMLInputTypeAttribute } from "react";

interface ComponentCommonProps {
  className: string;
  style: CSSProperties;
}

type CustomComponentProps = Partial<ComponentCommonProps>;

interface InputProperties {
  type: HTMLInputTypeAttribute;
  title: string;
  placeholder: string;
  required: boolean;
}

type InputProps = Partial<InputProperties> & CustomComponentProps;

export type { CustomComponentProps, InputProps };
