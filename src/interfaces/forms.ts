import * as yup from "yup";

interface LoginFormData {
  username: string;
  password: string;
}

const loginFormSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.number().positive().integer().required(),
  })
  .required();

export type { LoginFormData };
export { loginFormSchema };
