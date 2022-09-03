import type {
  CSSProperties,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import type { FieldError } from "react-hook-form";

// Common
interface ComponentCommonProps {
  className: string;
  style: CSSProperties;
}

type CustomComponentProps = Partial<ComponentCommonProps>;

// Inputs
interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  inputWrapperClassName: string;
  inputClassName: string;
  inputTitle: string;
  required: boolean;
  register: object;
  rightIcon: ReactNode;
  error: FieldError;
  errorMessage: string;
}

type InputProps = Partial<InputProperties> & CustomComponentProps;

// Buttons
interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element;
  title: string;
  onClick: () => void;
  block: boolean;
  size: "sm" | "md" | "lg";
  color: "default" | "danger";
}

type ButtonProps = Partial<ButtonProperties> & CustomComponentProps;

type GitHubButtonProperties = {
  title: string;
};

type GitHubButtonProps = Partial<GitHubButtonProperties> & CustomComponentProps;

// Notification
interface NotificationProperties {
  show: boolean;
  children: ReactNode;
}

type NotificationProps = Partial<NotificationProperties> & CustomComponentProps;

// Loading
interface LoadingProperties {
  fullScreen: boolean;
  width: string;
  height: string;
}

type LoadingProps = Partial<LoadingProperties> & CustomComponentProps;

// Note
interface NoteListCardProperties {
  note: Note;
  type: "note" | "archive";
}

type Note = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  priority: number;
  index: number;
  toped: boolean;
};

type NotesResult = {
  notes: Note[];
  count: number;
};

type NoteListCardProps = Partial<NoteListCardProperties> & CustomComponentProps;

// Trash
interface TrashNoteListCardProperties {
  note: TrashNote;
}

type TrashNote = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  archived: boolean;
};

type TrashNotesResult = {
  notes: TrashNote[];
  count: number;
};

type TrashNoteListCardProps = Partial<TrashNoteListCardProperties> &
  CustomComponentProps;

export type {
  CustomComponentProps,
  InputProps,
  ButtonProps,
  GitHubButtonProps,
  NotificationProps,
  LoadingProps,
  NoteListCardProps,
  Note,
  NotesResult,
  TrashNoteListCardProps,
  TrashNote,
  TrashNotesResult,
};
