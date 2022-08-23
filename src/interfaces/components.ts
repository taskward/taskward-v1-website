import type {
  CSSProperties,
  HTMLInputTypeAttribute,
  HTMLAttributes,
  ButtonHTMLAttributes,
} from "react";

interface ComponentCommonProps {
  className: string;
  style: CSSProperties;
}

type CustomComponentProps = Partial<ComponentCommonProps>;

interface InputProperties extends HTMLAttributes<HTMLInputElement> {
  inputWrapperClassName: string;
  inputClassName: string;
  type: HTMLInputTypeAttribute;
  inputTitle: string;
  required: boolean;
  register: object;
  rightIcon: JSX.Element;
}

type InputProps = Partial<InputProperties> & CustomComponentProps;

interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
  block: boolean;
}

type ButtonProps = Partial<ButtonProperties> & CustomComponentProps;

export type { CustomComponentProps, InputProps, ButtonProps };
