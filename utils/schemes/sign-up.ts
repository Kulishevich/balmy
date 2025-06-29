import * as yup from "yup";

export const signUpSchema = yup.object({
  name: yup.string().required("Введите ФИО получателя"),
  email: yup
    .string()
    .email("Введите корректный адрес электронной почты")
    .required("Введите ваш email"),
  password: yup.string().required("Введите пароль"),
  "personal-info": yup.boolean().required(),
});
