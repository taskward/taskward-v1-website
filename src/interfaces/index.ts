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
} from "./components";

export type { OutsideClickType } from "./hooks";

export type {
  LoginFormData,
  SignupFormData,
  NoteFormData,
  EditNoteFormData,
} from "./forms";
export {
  loginFormSchema,
  signupFormSchema,
  NoteFormSchema,
  EditNoteFormSchema,
} from "./forms";

export type { User, UserTokenModel } from "./user";

export { Role } from "./user";
