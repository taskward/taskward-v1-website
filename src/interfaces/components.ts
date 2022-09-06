import { UseMutateFunction } from "@tanstack/react-query";
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
type NoteType = "note" | "archive" | "trash";

interface NoteListCardProperties {
  note: Note;
  type: NoteType;
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

interface NoteListCardPanelProperties {
  focused: boolean;
  note: Note | TrashNote;
  type: "note" | "archive";
  copy: boolean;
  archive: UseMutateFunction<any, unknown, number, unknown>;
  softDelete: UseMutateFunction<any, unknown, number, unknown>;
  unarchive: UseMutateFunction<any, unknown, number, unknown>;
  restore: UseMutateFunction<any, unknown, number, unknown>;
  forceDelete: UseMutateFunction<any, unknown, number, unknown>;
}

type NoteListCardPanelProps = Partial<NoteListCardPanelProperties>;

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

// Modal

interface ModalProperties {
  children: ReactNode;
  show: boolean;
  toggle: () => void;
  closeModalCallback: (() => Promise<void>) | (() => void);
  modalClassName: string;
  backgroundClassName: string;
}

type ModalProps = Partial<ModalProperties>;

export type {
  CustomComponentProps,
  InputProps,
  ButtonProps,
  GitHubButtonProps,
  NotificationProps,
  LoadingProps,
  NoteType,
  NoteListCardProps,
  Note,
  NotesResult,
  NoteListCardPanelProps,
  TrashNoteListCardProps,
  TrashNote,
  TrashNotesResult,
  ModalProps,
};
