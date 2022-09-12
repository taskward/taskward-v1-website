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
  name: string;
  description: string;
  tasks: CreateTaskFormData[];
}

const CreateNoteFormSchema = yup.object({
  name: yup.string(),
  description: yup.string(),
  tasks: yup.array().of(
    yup.object().shape({
      content: yup.string(),
      linkUrl: yup.string(),
      finished: yup.boolean().required(),
    })
  ),
});

interface EditNoteFormData extends Omit<CreateNoteFormData, "tasks"> {
  id: number;
  tasks: EditTaskFormData[];
}

const EditNoteFormSchema = yup.object({
  id: yup.number().moreThan(0).required(),
  name: yup.string(),
  description: yup.string(),
  tasks: yup.array().of(
    yup.object().shape({
      id: yup.number().moreThan(0).required(),
      content: yup.string(),
      linkUrl: yup.string(),
      finished: yup.boolean().required(),
    })
  ),
});

// Task
interface CreateTaskFormData {
  content: string;
  linkUrl: string;
  finished: boolean;
}

interface EditTaskFormData extends CreateTaskFormData {
  id?: number;
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
  PatchTaskFinishedFormData,
};

export {
  loginFormSchema,
  signupFormSchema,
  CreateNoteFormSchema,
  EditNoteFormSchema,
};
