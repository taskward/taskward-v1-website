import * as yup from 'yup'

// Login
interface LoginFormData {
  username: string
  password: string
}

// /^\S*$/ means cannot have whitespace in username or password.
const loginFormSchema = yup
  .object({
    username: yup.string().max(16).matches(/^\S*$/).required(),
    password: yup.string().min(6).max(16).matches(/^\S*$/).required()
  })
  .required()

// Signup
interface SignupFormData extends LoginFormData {
  confirmPassword: string
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
      .oneOf([yup.ref('password'), null])
  })
  .required()

// Note
interface CreateNoteFormData {
  name: string | null
  description: string | null
  tasks: TaskFormData[]
}

interface EditNoteFormData extends Omit<CreateNoteFormData, 'tasks'> {
  id: number
  tasks: TaskFormData[]
}

// Task
interface TaskFormData {
  id?: number | string
  content: string | null
  linkUrl: string | null
  finished: boolean
  deleted?: boolean
  created?: boolean
}

interface PatchTaskFinishedFormData {
  id: number
  finished: boolean
}

export type {
  LoginFormData,
  SignupFormData,
  CreateNoteFormData,
  EditNoteFormData,
  TaskFormData,
  PatchTaskFinishedFormData
}

export { loginFormSchema, signupFormSchema }
