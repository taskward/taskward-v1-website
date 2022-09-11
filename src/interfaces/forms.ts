import * as yup from "yup";
import { TaskSubmitType } from "@interfaces";

interface LoginFormData {
  username: string;
  password: string;
}

// /^\S*$/ means cannot have whitespace in username or password.
const loginFormSchema = yup
  .object({
    username: yup.string().max(16).matches(/^\S*$/).required(),
    password: yup.string().min(6).max(16).matches(/^\S*$/).required(),
  })
  .required();

interface SignupFormData extends LoginFormData {
  confirmPassword: string;
}

const signupFormSchema = yup
  .object({
    username: yup.string().max(16).matches(/^\S*$/).required(),
    password: yup.string().min(6).max(16).matches(/^\S*$/).required(),
    confirmPassword: yup
      .string()
      .min(6)
      .max(16)
      .matches(/^\S*$/)
      .required()
      .oneOf([yup.ref("password"), null]),
  })
  .required();

interface NoteFormData {
  name: string;
  description: string;
  tasks: TaskSubmitType[];
}

const NoteFormSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  tasks: yup.array().of(
    yup.object().shape({
      content: yup.string().nullable(),
      linkUrl: yup.string().nullable(),
      finished: yup.boolean(),
    })
  ),
});

interface EditNoteFormData extends NoteFormData {
  id: number;
}

const EditNoteFormSchema = yup.object({
  id: yup.number().moreThan(0).required(),
  name: yup.string(),
  description: yup.string(),
});

interface UpdateTaskFinishStateFormData {
  id: number;
  finished: boolean;
}

export type {
  LoginFormData,
  SignupFormData,
  NoteFormData,
  EditNoteFormData,
  UpdateTaskFinishStateFormData,
};

export {
  loginFormSchema,
  signupFormSchema,
  NoteFormSchema,
  EditNoteFormSchema,
};
