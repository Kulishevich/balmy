import * as yup from "yup";

export const signInSchema = yup.object({
  email: yup
    .string()
    .email("Введите корректный адрес электронной почты")
    .required("Введите ваш email"),
  password: yup.string().required("Введите пароль"),
});
