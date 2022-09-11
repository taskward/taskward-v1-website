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

// Input
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

// Checkbox
interface CheckboxProperties extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName: string;
  inputWrapperClassName: string;
  checkboxTitle: string;
  register: object;
}

type CheckboxProps = Partial<CheckboxProperties> & CustomComponentProps;

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
  tasks: Task[];
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
  archiveLoading: boolean;
  softDelete: UseMutateFunction<any, unknown, number, unknown>;
  softDeleteLoading: boolean;
  unarchive: UseMutateFunction<any, unknown, number, unknown>;
  unarchiveLoading: boolean;
  restore: UseMutateFunction<any, unknown, number, unknown>;
  restoreLoading: boolean;
  forceDelete: UseMutateFunction<any, unknown, number, unknown>;
  forceDeleteLoading: boolean;
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
  tasks: Task[];
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

// Task Checkbox
interface TaskCheckboxProperties extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName: string;
  inputWrapperClassName: string;
  taskId: number;
  checkboxTitle: string | null;
  linkUrl: string | null;
  register: object;
  editable: boolean;
  noteType: NoteType;
  removeTask: () => void;
  changeChecked: () => void;
  changeContent: (content: string | null) => void;
  changeLinkUrl: (linkUrl: string | null) => void;
}

type TaskCheckboxProps = Partial<TaskCheckboxProperties> & CustomComponentProps;

type Task = {
  id: number;
  content: string;
  linkUrl: string;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
  priority: number;
  index: number;
};

type TaskSubmitType = {
  id?: number | string;
  content: string | null;
  linkUrl: string | null;
  finished: boolean;
};

export type {
  CustomComponentProps,
  InputProps,
  CheckboxProps,
  ButtonProps,
  GitHubButtonProps,
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
  TaskCheckboxProps,
  Task,
  TaskSubmitType,
};
