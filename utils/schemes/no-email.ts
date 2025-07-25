import * as yup from "yup";

export const noEmailScheme = yup.object({
  email: yup
    .string()
    .email("Введите корректный адрес электронной почты")
    .required("Введите email"),
});
