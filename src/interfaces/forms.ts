import * as yup from "yup";

// Login
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

// Signup
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

// Note
interface CreateNoteFormData {
  name: string | null;
  description: string | null;
  tasks: TaskFormData[];
}

const CreateNoteFormSchema = yup.object({
  name: yup.string().nullable(),
  description: yup.string().nullable(),
  tasks: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      content: yup.string().nullable(),
      linkUrl: yup.string().nullable(),
      finished: yup.boolean().required(),
    })
  ),
});

interface EditNoteFormData extends Omit<CreateNoteFormData, "tasks"> {
  id: number;
  tasks: TaskFormData[];
}

const EditNoteFormSchema = yup.object({
  id: yup.number().moreThan(0).required(),
  name: yup.string().nullable(),
  description: yup.string().nullable(),
  tasks: yup.array().of(
    yup.object().shape({
      id: yup.number().moreThan(0).required(),
      content: yup.string().nullable(),
      linkUrl: yup.string().nullable(),
      finished: yup.boolean().required(),
    })
  ),
});

// Task
interface TaskFormData {
  id?: number | string;
  content: string | null;
  linkUrl: string | null;
  finished: boolean;
}

interface PatchTaskFinishedFormData {
  id: number;
  finished: boolean;
}

export type {
  LoginFormData,
  SignupFormData,
  CreateNoteFormData,
  EditNoteFormData,
  TaskFormData,
  PatchTaskFinishedFormData,
};

export {
  loginFormSchema,
  signupFormSchema,
  CreateNoteFormSchema,
  EditNoteFormSchema,
};
