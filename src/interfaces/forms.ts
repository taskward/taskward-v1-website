import * as yup from "yup";

interface LoginFormData {
  username: string;
  password: string;
}

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
}

const NoteFromSchema = yup.object({
  name: yup.string().required(),
  description: yup.string(),
});
export type { LoginFormData, SignupFormData, NoteFormData };

export { loginFormSchema, signupFormSchema, NoteFromSchema };
