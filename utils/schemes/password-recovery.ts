import * as yup from "yup";

export const passwordRecoveryScheme = yup.object({
  phone: yup
    .string()
    .matches(/^(\+375|\+7)/, "Номер телефона должен начинаться с +375 или +7")
    .required("Введите номер телефона"),
});
