import * as yup from "yup";

export const changePasswordSchema = yup.object({
  new_password: yup
    .string()
    .min(6, "Минимальное кол-во символов - 6")
    .required("Введите пароль"),
});
