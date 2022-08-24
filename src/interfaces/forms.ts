import * as yup from "yup";

interface LoginFormData {
  username: string;
  password: string;
}

const loginFormSchema = yup
  .object({
    username: yup.string().max(16).required(),
    password: yup.string().max(16).required(),
  })
  .required();

export type { LoginFormData };
export { loginFormSchema };
