import * as yup from "yup";

export const secondSignInScheme = yup.object({
  password: yup.string().required("Введите пароль"),
});
